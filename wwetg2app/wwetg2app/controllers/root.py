# -*- coding: utf-8 -*-
"""Main Controller"""

import hashlib
import tg
from webob.exc import WSGIHTTPException
from tg import expose, flash, require, url, lurl
from tg import request, redirect, tmpl_context, response
from tg import jsonify
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from wwetg2app import model
from wwetg2app.controllers.secure import SecureController
from wwetg2app.model import DBSession
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController
from datetime import datetime, timedelta
from datetime import date as dt_date

from pytz import utc
import jwt
from jwt.exceptions import ExpiredSignatureError, DecodeError

from wwetg2app.lib.base import BaseController
from wwetg2app.controllers.error import ErrorController

import psycopg2
import json

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float, DateTime, func, desc, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import and_
import schedule
import asyncio
import threading
import re

# repoze for user authentication 
# from repoze.what.predicates import not_anonymous

__all__ = ['RootController']

SECRET_KEY = 'WhatWeEat'
FOOD_PREF = ('Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian', 'None')


# connect to database
DATABASE_URL = "postgresql://yanglintao:admin@localhost:5432/whatweeatapp"
engine = create_engine(DATABASE_URL)
connection = engine.connect()
# create a new session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


class Institution(Base):
    __tablename__ = 'institutions'
    institutionID = Column(Integer, primary_key=True)
    name = Column(String)

class DiningHall(Base):
    __tablename__ = 'dining_halls'
    email = Column(String)
    diningHallID = Column(Integer, primary_key=True)
    institutionID = Column(Integer, ForeignKey('institutions.institutionID'))
    name = Column(String)
    password = Column(String)
    address = Column(String)

class DiningHallReport(Base):
    __tablename__ = 'dining_hall_reports'
    diningHallID = Column(Integer, primary_key=True)
    date = Column(Date, primary_key=True)
    dietPreferences = Column(String)
    top10PriorityFoodAllergies = Column(String)
    top10HighestRatedDishes = Column(String)

class Dish(Base):
    __tablename__ = 'dish'
    dishID = Column(Integer, primary_key=True)
    diningHallID = Column(Integer, ForeignKey('dining_halls.diningHallID'))
    dishName = Column(String)
    calorie = Column(Integer)
    ingredients = Column(String)
    categories = Column(String)
    servingSize = Column(String)
    type = Column(String)

class DailyMenu(Base):
    __tablename__ = 'daily_menu'
    menuID = Column(Integer, primary_key=True)
    date = Column(Date)
    diningHallID = Column(Integer, ForeignKey('dining_halls.diningHallID'))

class MenuDish(Base):
    __tablename__ = 'menu_dish'
    dishID = Column(Integer,ForeignKey('dish.dishID'), primary_key=True)
    menuID = Column(Integer,ForeignKey('daily_menu.menuID'), primary_key=True)

class MealTracking(Base):
    __tablename__ = 'meal_trackings'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    date = Column(DateTime, primary_key=True)
    dishID = Column(Integer, ForeignKey('dish.dishID'), primary_key=True)
    quantity = Column(Integer, default=1) 

class UserRating(Base):
    __tablename__ = 'user_rating'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    dishID = Column(Integer,ForeignKey('dish.dishID'), primary_key=True)
    rating = Column(Integer)

class Allergy(Base):
    __tablename__ = 'allergy'
    allergyID = Column(Integer, primary_key=True)
    name = Column(String)

class FoodPreferences(Base):
    __tablename__ = 'food_preference'
    preferenceID = Column(Integer, primary_key=True)
    name = Column(String)

class UserProfile(Base):
    __tablename__ = 'user_profiles'
    userID = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    institutionID = Column(Integer, ForeignKey('institutions.institutionID'))
    allowDataCollect = Column(Boolean)

class DietGoal(Base):
    __tablename__ = 'diet_goal'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    startDate = Column(Date, primary_key=True)
    endDate = Column(Date)
    minCal = Column(Integer)
    maxCal = Column(Integer)

class UserAllergy(Base):
    __tablename__ = 'user_allergy'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    allergyID = Column(Integer, ForeignKey('allergy.allergyID'), primary_key=True)

class UserPreference(Base):
    __tablename__ = 'user_preference'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    preferenceID = Column(Integer, ForeignKey('food_preference.preferenceID'), primary_key=True)

class UserReports(Base):
    __tablename__ = 'user_reports'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    date = Column(Date, primary_key=True)
    actualIntake = Column(Float)
    dailyAverageIntake = Column(Float)


def init_db():
    with engine.connect() as connection:
        connection.execute("DROP TABLE IF EXISTS user_profiles CASCADE")
        # Drop other tables similarly if needed
    Base.metadata.drop_all(engine, checkfirst=True)
    Base.metadata.create_all(bind=engine)
    # Add food preferences
    food_preferences = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian', 'None']
    for i in range(len(food_preferences)):
        new_preference = FoodPreferences(
        preferenceID = i + 1, 
        name = food_preferences[i]
        )
        session.add(new_preference)
        session.commit()


init_db()

class AuthController(BaseController):

    @expose('wwetg2app.templates.login')
    def login(self, came_from='/'):
        return dict(came_from=came_from)

    @expose()
    #@validate({'email': validators.Email(), 'password': validators.NotEmpty()})
    def post_login(self, email, password, came_from='/'):
        user = DBSession.query(UserProfile).filter_by(email=email).first()

        if user and user.get_password() == password:
            # Perform your login logic here, create a session, etc.
            flash('Welcome back, %s!' % email)
            redirect(came_from)
            # success:
                # return message to front end
            # false:
                # return "user dne" or "invalid pw"
            
        else:
            flash('Wrong credentials', 'error')
            redirect('/login')


    @expose()
    def post_logout(self):
        # Handle logout, invalidate the session, etc.
        flash('You have been logged out')
        redirect('/')


    @expose('wwetg2app.templates.register')
    def register(self):
        # False message in registration:
            # Already registered (user name OR email): sign 1
            # return message (str)
        # success:
            # return message success (str)
        return {}
    

    @expose()
    #@validate({'email': validators.Email(), 'password': validators.NotEmpty()})
    def post_register(self, email, password):
        user = UserProfile(email=email)
        user.set_password(password)
        DBSession.add(user)
        # Commit the transaction to save the user to the database
        DBSession.commit()
        
        flash('Registration successful')
        redirect('/login')


class RootController(BaseController):
    """
    The root controller for the wwetg2app application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()

    def _before(self, *args, **kw):
        tmpl_context.project_name = "wwetg2app"
   
    @expose('wwetg2app.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    @expose('wwetg2app.templates.about')
    def about(self):
        """Handle the 'about' page."""
        return dict(page='about')

    @expose('wwetg2app.templates.environ')
    def environ(self):
        """This method showcases TG's access to the wsgi environment."""
        return dict(page='environ', environment=request.environ)

    @expose('wwetg2app.templates.data')
    @expose('json')
    def data(self, **kw):
        """
        This method showcases how you can use the same controller
        for a data page and a display page.
        """
        return dict(page='data', params=kw)
    @expose('wwetg2app.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')

    @expose('wwetg2app.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')

    @expose('wwetg2app.templates.login')
    def login(self, came_from=lurl('/'), failure=None, login=''):
        """Start the user login."""
        if failure is not None:
            if failure == 'user-not-found':
                flash(_('User not found'), 'error')
            elif failure == 'invalid-password':
                flash(_('Invalid Password'), 'error')

        login_counter = request.environ.get('repoze.who.logins', 0)
        if failure is None and login_counter > 0:
            flash(_('Wrong credentials'), 'warning')

        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from, login=login)

    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                     params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        return HTTPFound(location=came_from)
    
    @expose('json')
    def register_institution(self):
        data = request.json_body
        name = data.get('name')
        institution_exist = session.query(Institution).filter_by(name=name).first()
        if institution_exist:
            flash(_('The institution name already exists.'), 'error')
            return {"message": "The institution name already exists."}
        else:
            try:
                # Generate unique institution ID:
                institution_id = session.query(Institution).count() +1
                # Insert rows
                new_insti = Institution(
                    institutionID = institution_id,
                    name = name,
                )
                session.add(new_insti)
                session.commit()
                flash(_('Registration sucess.'), 'warning')
                return {"message": "Institution register success", "institutionID": institution_id}
            except Exception as e:
                session.rollback()
                return {"message": f"Error: {str(e)}"}
            
    @expose('json')
    def register_dininghall(self):  
        data = request.json_body
        email = data.get('email')
        name = data.get('name') 
        institution_id = int(data.get('institutionId'))
        password = data.get('password') 
        dining_email = session.query(DiningHall).filter_by(email=email).first()
        name_exist = session.query(DiningHall).filter_by(name=name).first()
        institution_exist = session.query(Institution).filter_by(institutionID=institution_id).first()

        if dining_email:
            # flash("This email has already be used by a dining hall account")
            return {"message": "This email has already be used by a dining hall account."}
        
        if name_exist:
            # flash(_('The dining hall name already exists.'), 'error')
            return {"message": "The dining hall name already exists."}

        if not institution_exist:
            # flash(_('The institution does not exist. '), 'error')
            return {"message": "The institution doesn't exist. "}
                
        else:
            # Generate unique dining hall ID:
            diningHall_id = session.query(DiningHall).count() +1
            # Hash password
            hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
            # Insert rows
            new_hall = DiningHall(
                email = email, 
                diningHallID = diningHall_id,
                institutionID = institution_id,
                name = name,
                password = hashed_password
            )
            session.add(new_hall)
            session.commit()
            flash(_('Dining Hall registration success '), 'warning')
            return {"message": "Dining Hall register success"}
        
    @expose('json')
    def register_common(self):
        data = request.json_body
        email = data.get('email')
        password = data.get('password')
        institutionID = data.get('institutionID')
        user_email = session.query(UserProfile).filter_by(email=email).first()
        institution_ID = session.query(Institution).filter_by(institutionID = institutionID).first()

        if user_email:
            return {"message": "This email has already been registered"}
        elif not institution_ID:
            return {"message": "This institution ID does not exist."}
        else:
            try:    
                # Insert rows
                user_num = session.query(UserProfile).count()
                flash(user_num)
                hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
                new_common = UserProfile(
                    userID = user_num + 1,
                    email = email,
                    password = hashed_password,
                    institutionID = institutionID
                )
                session.add(new_common)
                session.commit()
                return {"message": "Registration success"}
            except Exception as e:
                    session.rollback()
                    return {"message": f"Error: {str(e)}"}  

    @expose('json')
    def login_status(self):
        token = request.headers.get('Authorization')
        if not token:
            return {"status": "error", "message": "Token is missing."}
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            
            # Get the role and ID from the token
            role = decoded_token['role']
            user_id = decoded_token['user_id']
            expiration = datetime.utcfromtimestamp(decoded_token['exp'])

            # Get the last login time based on role and user_id
            if role == "common":
                user = session.query(UserProfile).filter_by(userID=user_id).first()
                if user:
                    insID = user.institutionID
                    insName = ""
                    if insID:
                        institution = session.query(Institution).filter_by(institutionID=insID).first()
                        if institution:
                            insName = institution.name
                    return {
                        "status": "success", 
                        "message": "User is logged in.", 
                        "role": role, 
                        "user_id": user_id,
                        "institutionName": insName,
                        "institutionID": insID,
                        "email": user.email
                    }
            elif role == "dining":
                user = session.query(DiningHall).filter_by(diningHallID=user_id).first()

            if not user:
                return {"status": "error", "message": "Invalid user."}

            # Compare last_login with current time
            if datetime.now() > expiration:
                return {"status": "error", "message": "Login expired.", "role": role}

            return {"status": "success", "message": "User is logged in.", "role": role, "user_id": user_id}

        except ExpiredSignatureError:
            return {"status": "error", "message": "Token has expired."}
        except DecodeError:
            return {"status": "error", "message": "Token is invalid."}


    @expose('json')
    def login(self):  
        data = request.json_body
        emailID = data.get('emailID')
        pwd = data.get('password') 
        role = data.get('role')
        
        if role == "common":
            user_email = session.query(UserProfile).filter_by(email=emailID).first()
            if not user_email:
                return {"message":"user email or password not correct"}
            else:
                password = user_email.password
                session.commit()
                token = jwt.encode({'user_id': user_email.userID, 'role': role, 'exp': datetime.now(utc) + timedelta(minutes=30)}, SECRET_KEY, algorithm="HS256")
                if hashlib.sha256(pwd.encode('utf-8')).hexdigest() == password:
                    return {"message": "login success for a common user", "token": token}
                else:
                    return {"message":"user email or password not correct"}
                    
        if role == "dining":
            dining_email = session.query(DiningHall).filter_by(email=emailID).first()
            if not dining_email:
                return {"message":"dining hall email or password not correct"}
            else:
                password = dining_email.password
                session.commit()
                token = jwt.encode({'user_id': dining_email.diningHallID, 'role': role, 'exp': datetime.now(utc) + timedelta(minutes=30)}, SECRET_KEY, algorithm="HS256")
                if hashlib.sha256(pwd.encode('utf-8')).hexdigest() == password:
                    return {"message": "login success for a dining hall user", "token": token}
                else:
                    return {"message":"Dining ID or password not correct"}
    
    @expose('json')
    # return all the dining hall names under an institution
    def getAllDiningHalls(self):
        data = request.json_body
        institutionID = data.get("institutionID")
        institution = session.query(Institution).filter_by(institutionID = institutionID).first()
        if institution:
            diningHallList = []
            diningHalls = session.query(DiningHall).filter_by(institutionID = institutionID).all()
            for d in diningHalls:
                diningHallInfo = {"name": d.name, "id": d.diningHallID}
                diningHallList.append(diningHallInfo)
            # return {"message":"Dining Hall List Returned."}
            return {"DiningHalls": diningHallList}

        else:
            return {"message":"Institution doesn't exist"}

    
    @expose('json')
    # return a number representing if the dish is recommended (2), nothing (1), or warnning (0).
    def customizedLabel(dishID,diningHallID,userID):
        dish = session.query(Dish).filter_by(dishID=dishID).filter_by(diningHallID = diningHallID).first()
        ingredientList = [ingredient.lower() for ingredient in dish.ingredients.split(',')]
        categorieList = json.loads(dish.categories)

        allergyList = []
        userAllergies = session.query(UserAllergy).filter_by(userID = userID).all()
        for userAllergy in userAllergies:
            allergyID = userAllergy.allergyID
            allergyName = session.query(Allergy).filter_by(allergyID=allergyID).first().name.lower()
            allergyList.append(allergyName)
   
        preferenceList = []
        userPreferences = session.query(UserPreference).filter_by(userID = userID).all()
        for userPreference in userPreferences:
            preferenceID = userPreference.preferenceID
            preferenceName = session.query(FoodPreferences).filter_by(preferenceID = preferenceID).first().name
            preferenceList.append(preferenceName)
        

        for ingredient in ingredientList:
            if ingredient in allergyList:
                return 0
        for categorie in categorieList:
            if categorie in preferenceList:
                return 2
        return 1

          
    @expose('json')
    # return user's own rating if exists, owse return the average rating.
    def getFoodRating(dishName,diningHallID,userID):
        dish_record = session.query(Dish).filter_by(diningHallID=diningHallID, dishName=dishName).first()
        dishID = dish_record.dishID
        user_rating = session.query(UserRating).filter_by(userID=userID, dishID=dishID).first()
        if user_rating:
            return user_rating.rating
        else:
            dishID = session.query(Dish).filter_by(diningHallID = diningHallID).filter_by(dishName = dishName).first().dishID
            ratings = session.query(UserRating).filter_by(dishID = dishID).all()
            rating_list = []
            for rating in ratings:
                rating_list.append(rating.rating)
            if len(rating_list)>0:
                return round(sum(rating_list) / len(rating_list),1)
            else:
                return 0

    
    @expose('json')
    # return today's menu. Customized recommendation and warnning are added.
    def browseMenu(self):
        
        data = request.json_body
        diningHallID = data.get("diningHallID")
        userID = data.get("userID")
        today = dt_date.today()
        menu = session.query(DailyMenu).filter_by(date=today).filter_by(diningHallID = diningHallID).first()
        diningHallExist = session.query(DiningHall).filter_by(diningHallID = diningHallID).first()
        user = session.query(UserProfile).filter_by(userID = userID).first()
        if not user:
            return {"messate": "User doesn't exist."}
        if not diningHallExist:
            return {"message":"Dining Hall Doesn't Exist."}
        if menu:
            dishList = []
            # dishIDs = session.query(MenuDish).filter_by(menuID=menu.menuID).all().dishID
            dishIDs = [dish.dishID for dish in session.query(MenuDish).filter_by(menuID=menu.menuID).all()]
            for id in dishIDs:
                dish = session.query(Dish).filter_by(dishID=id).filter_by(diningHallID = diningHallID).first()
                rating = RootController.getFoodRating(dish.dishName,diningHallID,userID)
                label = RootController.customizedLabel(id,diningHallID,userID)
                cleaned_categories = re.sub(r'[{}"]', '', dish.categories)
                dishInfo = {
                    "dishID": dish.dishID,
                    "dishName": dish.dishName,
                    "calorie": dish.calorie,
                    "ingredients": dish.ingredients,
                    "categories": ', '.join(cleaned_categories.split(',')),
                    "servingSize": dish.servingSize,
                    "type": dish.type,
                    "rating" : rating,
                    "customizedLabel": label
                }
                dishList.append(dishInfo)
            sortedDishList = sorted(dishList, key=lambda x: (-x["customizedLabel"], x["rating"]))
            return {"sortedDishList":sortedDishList}
        else:
            return {"message": "Today's menu is not available."}



#---------PREFERENCE & ALLERGY--------------
    @expose('json')
    # upadate everything in the preference about that user
    # Assume userPref has correct number of tags and all tags are in the FOOD_PREF
    def updateUserPreference(self):
        data = request.json_body
        userID = data.get("userID")
        userPref = data.get("userPref") # a list of strings

        if userID:
            # Drop all the rows related to that user
            toDrop = session.query(UserPreference).filter_by(userID = userID).all()
            for drop in toDrop:
                session.delete(drop)
            session.commit()

            # If there are user preferences
            if len(userPref) != 0:
                # Get all the preferences in the database
                preferenceDB = session.query(FoodPreferences)
                preferenceDBDict = {}
                for preference in preferenceDB:
                    preferenceDBDict[preference.name] = preference.preferenceID

                # Add user's preferences to the userPreference table
                for preference in userPref:
                    new_userPref = UserPreference(
                    userID = userID,
                    preferenceID = preferenceDBDict[preference]
                    )
                    session.add(new_userPref)
                    session.commit()
            return {"Message": "Successfully updated the food preference info into your profile."}
        else:
            return {"message": "You have to login first."}
        
    @expose('json')
    # return a list of string of user's preference
    def getUserPreference(self):
        data = request.json_body
        userID = data.get('userID')
        if userID:
            preferenceList = []
            userPreferences = session.query(UserPreference).filter_by(userID = userID).all()
            for userPreference in userPreferences:
                preferenceID = userPreference.preferenceID
                preferenceName = session.query(FoodPreferences).filter_by(preferenceID = preferenceID).first().name
                preferenceList.append(preferenceName)
            return {"Preferences": preferenceList}
        else:
            return {"message": "You have to login first."}
        
    @expose('json')
    def updateAllergy(self):
        data = request.json_body
        allergyList = data.get('allergies')
        userID = data.get("userID")
        if userID:
            # Drop all the rows related to that user
            toDrop = session.query(UserAllergy).filter_by(userID = userID).all()
            for drop in toDrop:
                session.delete(drop)
            session.commit()

            # If there are user allergies
            if len(allergyList) != 0:
                # Get all the current allergies in the database
                allergyDB = session.query(Allergy)
                allergyDBDict = {}
                for allergy in allergyDB:
                    allergyDBDict[allergy.name] = allergy.allergyID

                # Add user's allergies to the userAllergy table
                for allergy in allergyList:
                    allergy = allergy.lower()
                    # Check if the user allergies are in the database
                    # If not, add the allergy to the allergy table first
                    if allergy not in allergyDBDict:
                        new_allergy = Allergy(
                            name = allergy,
                            allergyID = len(allergyDBDict) + 1
                        )
                        session.add(new_allergy)
                        session.commit()
                        allergyDBDict[allergy] = len(allergyDBDict) + 1
                    new_userallergy = UserAllergy(
                    userID = userID,
                    allergyID = allergyDBDict[allergy]
                    )
                    session.add(new_userallergy)
                    session.commit()
            return {"Message": "Successfully updated the allergy info into your profile."}
        else:
            return {"message": "You have to login first."}

    @expose('json') 
    def getAllergy(self):
        data = request.json_body
        userID = data.get("userID")
        if userID:
            allergyList = []
            userAllergies = session.query(UserAllergy).filter_by(userID = userID).all()
            for userAllergy in userAllergies:
                allergyID = userAllergy.allergyID
                allergyName = session.query(Allergy).filter_by(allergyID = allergyID).first().name
                allergyList.append(allergyName)
            return {"Allergies": allergyList}
        else:
            return {"message": "You have to login first."}
        
#--------------GET ACCOUNTS-----------------
    @expose('json')
    def get_common_user_account(self):
        data = request.json_body
        userID = data.get("userID")
        if userID:
            userInfo = session.query(UserProfile).filter_by(userID = userID).first()
            email = userInfo.email
            insID = userInfo.institutionID
            insName = session.query(Institution).filter_by(institutionID = insID).first().name
            return {"institutionName": insName, "institutionID": insID, "email": email}
        else:
            return {"message": "You have to login first."}
        
    @expose('json')
    def get_dining_hall_account(self):
        data = request.json_body
        diningHallID = data.get("diningHallID")
        if diningHallID:
            diningHallInfo = session.query(DiningHall).filter_by(diningHallID = diningHallID).first()
            institutionID = diningHallInfo.institutionID
            institutionName = session.query(Institution).filter_by(institutionID = institutionID).first().name
            diningHallName = diningHallInfo.name
            email = diningHallInfo.email
            address = diningHallInfo.address
            return {"institutionID": institutionID, "institutionName": institutionName, "diningHallName":diningHallName, "email": email, "address": address}
        else:
            return {"message": "You have to login first."}
      
#---------UPLOAD MENU & MENUITEM------------
    @expose('json')
    def addDish(self):
        data = request.json_body
        menuID = data.get("menuID")
        name = data.get("name")
        diningHallID = data.get("diningHallID")
        ingredients = data.get("ingredients")
        calorie = data.get("calories")
        categories = json.dumps(data.get("categories"))
        servingSize = data.get("serving_size")
        type = data.get("type")
        
        # check if the menu exists
        menuExist = session.query(DailyMenu).filter_by(menuID=menuID).first()
        if not menuExist:
            return {"message": "Menu doesn't exist."}

        # check if the dish has been created before
        dishExist = session.query(Dish).filter_by(diningHallID=diningHallID, dishName=name).first()
        if not dishExist:
            # create the new dish and add to Dish table
            dishID = session.query(Dish).count() + 1
            newDish = Dish(
                dishID=dishID,
                diningHallID=diningHallID,
                dishName=name,
                calorie=calorie,
                ingredients=ingredients,
                categories=categories,
                servingSize=servingSize,
                type=type
            )
            session.add(newDish)
            session.commit()
            # After adding the dish, also add the relationship to MenuDish
            newMenuDish = MenuDish(
                dishID=dishID,
                menuID=menuID
            )
            session.add(newMenuDish)
            session.commit()
            return {"message": "finish uploading", "dishID": dishID}
        else:
            return {"message": "Dish exists"}
        
    
    @expose('json')
    # update information of an existing dish, changing the information in Dish table
    def updateDish(self):
        data = request.json_body
        name = data.get("name")
        diningHallID = data.get("diningHallID")
        ingredients = data.get("ingredients")
        calorie = int(data.get("calories"))
        categories = json.dumps(data.get("categories"))
        servingSize = data.get("servingSize") 
        type = data.get("type")

        # check if the dish has been created before
        dish = session.query(Dish).filter_by(diningHallID = diningHallID).filter_by(dishName = name).first()
        if dish:
            dish.calorie = calorie
            dish.ingredients = ingredients
            dish.categories = categories
            dish.servingSize = servingSize
            dish.type= type
            session.commit()
            return {"message":"Dish Information Updated."}

        else: 
            return {"message":"Dish doesn't exist."}


    # delete a dish from a menu in MenuDish table
    @expose('json')
    def deleteDishFromMenu(self):
        data = request.json_body
        menuID = int(data.get("menuID"))
        dishID = data.get("dishID")
        # check existence
        dish = session.query(MenuDish).filter_by(dishID=dishID).filter_by(menuID=menuID).first()
        # delete item
        if dish:
            session.delete(dish)
            session.commit()
            return {"message":"Deleted Successfully"}
        else:
            return {"message":"Item not found or already deleted"}
    
    
    @expose('json')
    # delete a menu, and its items from DailyMenu and MenuDish tables.
    def deleteMenu(self):
        data = request.json_body
        menuID = data.get("menuID")
        menu = session.query(DailyMenu).filter_by(menuID = menuID).first()
        if menu:
            # delete all dish itmes having the same menuID
            menuDishes = session.query(MenuDish).filter_by(menuID = menuID).all()
            for dish in menuDishes:
                session.delete(dish)
                session.commit()
            # delete the menu
            session.delete(menu)
            session.commit()
            return {"message":"Menu deleted."}
        else:
            return {"message":"Menu doesn't exist."}
        
    @expose('json')  
    # dining hall create a new daliy menu
    def createDailyMenu(self):
        data = request.json_body
        dishList = data.get("dishes")
        date = data.get("menuDate")
        # date = datetime.strptime(date, "%Y-%m-%d").date() # DELETE LATTER !!! OLNY FOR TESTING
        diningHallID = data.get("diningHallID")
        diningHall = session.query(DiningHall).filter_by(diningHallID = diningHallID).first()
        if not diningHall:
            return {"message": "Dining Hall DNE."}
        # create a DaliyMenu object, and add the MenuItems to it
        menuID = session.query(DailyMenu).count() +1
        menu = DailyMenu(
                menuID = menuID,
                date = date,
                diningHallID = diningHallID,
                )
        session.add(menu)
        session.commit()
        for idx in range(len(dishList)):
            dish = dishList[idx]
            dishExist = session.query(Dish).filter_by(diningHallID = diningHallID).filter_by(dishName = dish["dishName"]).first()
            if not dishExist:
                # that dish DNE before
                dishID = session.query(Dish).count() +1
                newDish = Dish(
                    dishID = dishID,
                    diningHallID = diningHallID,
                    dishName = dish["dishName"],
                    calorie = dish["calories"],
                    ingredients = dish["ingredients"],
                    categories = json.dumps(dish['categories']),
                    servingSize = dish["serving_size"],
                    type = dish["type"]
                )
                session.add(newDish)
                session.commit()
            else:
                dishID = dishExist.dishID
            newMenuDish = MenuDish(
                dishID = dishID,
                menuID = menuID
            )
            session.add(newMenuDish)
            session.commit()
        return {"message": "Menu created"}
    
    # Display all the menus under that dining hall
    @expose('json')
    def getHistoricalMenu(self):
        data = request.json_body
        diningHallID = data.get("diningHallID")

        # Query all menus for the specified dining hall
        menus = session.query(DailyMenu).filter_by(diningHallID=diningHallID).all()
        menuList = {}

        for menu in menus:
            # Query all dish IDs associated with the current menu
            menuDishes = session.query(MenuDish).filter_by(menuID=menu.menuID).all()
            dishList = []

            for menuDish in menuDishes:
                # Query details of each dish
                dish = session.query(Dish).filter_by(dishID=menuDish.dishID).first()
                if dish:
                    dishDetails = {
                        "dishID": dish.dishID,
                        "dishName": dish.dishName,
                        "calorie": dish.calorie,
                        "ingredients": dish.ingredients,
                        'categories': json.loads(dish.categories),
                        "servingSize": dish.servingSize,
                        "type": dish.type
                    }
                    dishList.append(dishDetails)

            # Store the menu with its associated dishes
            menuList[menu.menuID] = {
                "date": menu.date,
                "dishes": dishList
            }

        return menuList
    
#-----------------Ratings-------------------
    @expose('json')
    def update_food_item_rating(self):
        data = request.json_body
        userID = data.get("userID")
        rating = data.get("rating")
        diningHallID = data.get("diningHallID")
        dishName = data.get("dishName")
        if userID:
            # Delete previous rating if has
            dish_record = session.query(Dish).filter_by(diningHallID=diningHallID, dishName=dishName).first()

            if dish_record:
                dishID = dish_record.dishID
                # Delete previous rating if it exists
                existing_rating = session.query(UserRating).filter_by(userID=userID, dishID=dishID).first()
                if existing_rating:
                    session.delete(existing_rating)
                    session.commit()

                # Add new rating
                new_rating = UserRating(
                    userID=userID,
                    dishID=dishID,
                    rating=rating
                )
                session.add(new_rating)
                session.commit()
                return {"message": "Successfully updated your rating"}
            else:
                return {"message": f"Dish '{dishName}' not found in dining hall ID {diningHallID}"}
        else:
            return {"message": "You have to login first."}
        
    @expose('json')
    def get_food_rating(self):
        data = request.json_body
        userID = data.get("userID")
        diningHallID = data.get("diningHallID")
        dishName = data.get("dishName")
        if userID:
            dishID = session.query(Dish).filter_by(diningHallID = diningHallID).filter_by(dishName = dishName).first().dishID
            rating = session.query(UserRating).filter_by(userID = userID).filter_by(dishID = dishID).first().rating
            return {"rating": rating}
        else:
            return {"message": "You have to login first."}
        
    @expose('json')
    def get_average_food_rating(self):
        data = request.json_body
        diningHallID = data.get("diningHallID")
        dishName = data.get("dishName")
        dishID = session.query(Dish).filter_by(diningHallID = diningHallID).filter_by(dishName = dishName).first().dishID
        ratings = session.query(UserRating).filter_by(dishID = dishID).all()
        rating_list = []
        for rating in ratings:
            rating_list.append(rating.rating)
        return {"rating": round(sum(rating_list) / len(rating_list),1)}
    
#--------------Meal Tracking----------------
    @expose('json')
    def track_meal(self):
        data = request.json_body
        diningHallID = data.get("diningHallID")
        dishDetails = data.get("dishDetails")  # This is now an array of objects
        userID = data.get("userID")

        if userID:
            for dish_detail in dishDetails:
                dish_name = dish_detail.get("dishName")
                quantity = dish_detail.get("quantity")

                dish_record = session.query(Dish).filter_by(diningHallID=diningHallID, dishName=dish_name).first()
                if dish_record:
                    dishID = dish_record.dishID
                    today = datetime.today()

                    # Check if the meal is already tracked
                    existing_track = session.query(MealTracking).filter_by(userID=userID, date=today, dishID=dishID ).first()
                    if existing_track:
                        # Increment the quantity for the existing record
                        existing_track.quantity += quantity
                        session.commit()
                        print(f"Updated existing record for dishID {dishID} with new quantity {existing_track.quantity}")
                    else:
                        # Create a new tracking record
                        new_track_dish = MealTracking(
                            userID=userID,
                            dishID=dishID,
                            date=today,
                            quantity=quantity
                        )
                        session.add(new_track_dish)
                        session.commit()
                        print(f"Inserted new tracking record for dishID {dishID}")
                else:
                    print(f"Dish '{dish_name}' not found in dining hall ID {diningHallID}")
                    return {"message": f"Dish '{dish_name}' not found in dining hall ID {diningHallID}"}
            return {"message": "Successfully updated your meal tracking"}
        else:
            print("User not logged in")
            return {"message": "You have to login first."}
        
    @expose('json')
    # return 5 the most recent meals
    def getRecentMeals(self):
        data = request.json_body
        userID = data.get('userID')
        recentMealsList = []

        recentMeals = session.query(
            MealTracking.date,
            DiningHall.name,
            func.sum(Dish.calorie * MealTracking.quantity).label('total_calories')
        ).join(Dish, MealTracking.dishID == Dish.dishID
        ).join(DiningHall, Dish.diningHallID == DiningHall.diningHallID
        ).filter(MealTracking.userID == userID
        ).group_by(MealTracking.date
        ).group_by(DiningHall.name
        ).order_by(MealTracking.date.desc()
        ).limit(5).all()

        for recentMeal in recentMeals:      
            pastMeal = {
                "date": recentMeal.date.date(),
                "time": recentMeal.date.time().replace(microsecond=0),
                "calories": recentMeal.total_calories,
                "dining_hall": recentMeal.name
            }
            recentMealsList.append(pastMeal)
        return {"recentMeals": recentMealsList}
    
    @expose('json')
    # return the calorie intake by time on that day.
    def calcDailyCalorieIntakeByTime(userID):
        today = datetime.today().date()
        calorieIntake = []
        tYear = datetime.now().year
        tMonth = datetime.now().month
        tDay = datetime.now().day
        userExist = session.query(UserProfile).filter_by(userID = userID).first()
        if not userExist:
            return {"messege" : "User doesn't exsit"}
        for i in range(0,24,2):
            start_time = datetime(tYear, tMonth, tDay, i, 0, 0)

            end_time = datetime(tYear, tMonth, tDay, i+1, 59, 0)
            meals_in_time_period = (
                session.query(MealTracking)
                .filter_by(userID=userID)
                .filter(and_(MealTracking.date >= start_time, MealTracking.date < end_time))
                .all()
            )
            period_intake = 0
            for meal in meals_in_time_period:
                if meal.date.date() == today:
                    dish_calorie = session.query(Dish).filter_by(dishID = meal.dishID).first().calorie
                    period_intake += dish_calorie * meal.quantity
            period = {
                "time": "{0:02d}:00 - {1:02d}:00".format(i,i+2),
                "calorie_intake": period_intake
            }
            calorieIntake.append(period)
        return calorieIntake

    # time is in the form of datetime.now(), must include day, month, year
    def calcTotalCalorieIntakeByDate(userID, time):
        tYear = time.year
        tMonth = time.month
        tDay = time.day
        start_time = datetime(tYear, tMonth, tDay, 0, 0, 0)
        end_time = datetime(tYear, tMonth, tDay, 23, 59, 0)
        # how many meals are consumed on that day
        meals_in_time_period = (
            session.query(MealTracking)
            .filter_by(userID=userID)
            .filter(and_(MealTracking.date >= start_time, MealTracking.date < end_time))
            .all()
        )
        period_intake =0 
        for meal in meals_in_time_period:
            # if meal.date.date() == today:
            dish_calorie = session.query(Dish).filter_by(dishID = meal.dishID).first().calorie
            period_intake += dish_calorie * meal.quantity
        return period_intake
        

    @expose('json')
    def getDailyCalorieIntakeByTime(self):
        
        data = request.json_body
        userID = data.get("userID")
        calorieIntake = RootController.calcDailyCalorieIntakeByTime(userID)
        return {"calorie_intake": calorieIntake}

    @expose('json')
    # get total calorie intake on that day
    def getDailyCalorieIntakeTotal(self):
        data = request.json_body
        userID = data.get("userID")
        userExist = session.query(UserProfile).filter_by(userID = userID).first()
        if not userExist:
            return {"messege" : "User doesn't exsit"}
        calorieIntake = RootController.calcDailyCalorieIntakeByTime(userID)     
        total_calorie = 0
        for period in calorieIntake:
            total_calorie += period["calorie_intake"]
        return {"total_calorie_intake":total_calorie}


#--------------Set & Get Personal Diet Goal---------------
    @expose('json')
    def setPersonalDietGoal(self):
        data = request.json_body
        userID = data.get("userID")
        startDate = data.get("startDate")
        endDate = data.get("endDate")
        dailyCalorieIntakeMaximum = data.get("dailyCalorieIntakeMaximum")
        dailyCalorieIntakeMinimum = data.get("dailyCalorieIntakeMinimum")
        userExist = session.query(UserProfile).filter_by(userID=userID).first()
        if userExist:
            if startDate == endDate:
                return {"message":"Period too short."}
            if startDate < endDate:
                overlap = (session.query(DietGoal)
                .filter_by(userID=userID)
                .filter(DietGoal.endDate >= startDate)
                .all()
                )
                if overlap:
                    return {"message": "The periods of different goals can't overlap with each other."}

                newGoal = DietGoal(
                    userID = userID,
                    startDate = startDate,
                    endDate = endDate,
                    maxCal = dailyCalorieIntakeMaximum,
                    minCal = dailyCalorieIntakeMinimum
                )
                session.add(newGoal)
                session.commit()
                return {"message":"The goal is sucessfully created."}
            else:
                return {"message":"Invalid start date and end date."}
        return {"message":"User not found."}
    @expose('json')
    def getPersonalDietGoal(self):
        data = request.json_body
        userID = data.get("userID")
        today = dt_date.today()
        userExist = session.query(UserProfile).filter_by(userID=userID).first()
        if userExist:
            currentGoal = (session.query(DietGoal)
                       .filter_by(userID=userID)
                       .filter(and_(DietGoal.startDate <= today, DietGoal.endDate >= today))
                       .first())
            if currentGoal:
                return {"startDate":currentGoal.startDate,
                        "endDate": currentGoal.endDate,
                        "dailyCalorieIntakeMaximum":currentGoal.maxCal,
                        "dailyCalorieIntakeMinimum":currentGoal.minCal}
            else:
                return{"message":"Goal doesn't exist"}
        else:
            return {"message":"User doesn't exist"}


    @expose('json')
    def getDietGoalLiveProgress(self):
        data = request.json_body
        userID = data.get("userID")
        today = dt_date.today()
        # today = datetime.date.today()
        # find the current goal
        
        currentGoal = (session.query(DietGoal)
                       .filter_by(userID=userID)
                       .filter(and_(DietGoal.startDate <= today, DietGoal.endDate > today))
                       .first())
        if currentGoal:
            # goalProgress = [0] * (currentGoal.endDate - currentGoal.startDate).days
            goalProgress = []
            calorieRecord = [] # used for testing
            totalDays = (currentGoal.endDate - currentGoal.startDate).days + 1
            # if on a given day the intake fullfill the goal, record 1; exceeds the goal, record 2; no data, record 0.
            currentDate = currentGoal.startDate
            while currentDate <= currentGoal.endDate:
                if currentDate <= today:
                    time = datetime(currentDate.year, currentDate.month, currentDate.day)
                    dailyIntake = RootController.calcTotalCalorieIntakeByDate(userID, time)
                    calorieRecord.append(dailyIntake)
                    if dailyIntake == 0:
                        goalProgress.append(0) # no data, not eating in the dining halls
                    elif (dailyIntake > currentGoal.maxCal or dailyIntake < currentGoal.minCal):
                        goalProgress.append(2) # not fullfill the daily goal
                    else:
                        goalProgress.append(1) # fullfill the goal
                else:
                    calorieRecord.append(-1)
                    goalProgress.append(0) # haven't arrive to that day
                currentDate += timedelta(days=1)
            # check
            if len(goalProgress) != totalDays:
                return {"message":"There are some problem when claculating the live progress",
                        "goalProgress":goalProgress,
                        "totalDays": totalDays,
                        "startDate:": currentGoal.startDate,
                        "endDate" : currentGoal.endDate}
            # sum up
            daysFullfilledGoal = goalProgress.count(1)
            daysNotFullfilledGoal=goalProgress.count(2)
            daysWithoutData = goalProgress.count(0)
            progressPercentage = daysFullfilledGoal / totalDays
            return {"daysFullfilledGoal":daysFullfilledGoal,
                    "daysNotFullfilledGoal":daysNotFullfilledGoal,
                    "daysWithoutData":daysWithoutData,
                    "progressPercentage":progressPercentage,
                    "totalDays":totalDays
                    }

        else:
            return {"message":"Current goal doesn't exist."}

#--------------Get Reports------------------
    @expose('json')
    def getDiningHallMonthlyReports(self):
        # Todo
        data = request.json_body
        diningHallID = data.get("diningHallID")
        reports = session.query(DiningHallReport).filter_by(diningHallID = diningHallID).order_by(desc(DiningHallReport.date)).limit(10)
        report_list = []
        for report in reports:
            year = report.date.year
            month = report.date.month
            report_month = str(year) + "-" + str(month)
            top_ten_rated_food = json.loads(report.top10HighestRatedDishes)
            top_ten_allergies = json.loads(report.top10PriorityFoodAllergies)
            top_preferences = json.loads(report.dietPreferences)
            report = {"report_month": report_month, "top_ten_rated_food": top_ten_rated_food, 
                      "top_ten_allergies":top_ten_allergies, "top_preferences": top_preferences}
            report_list.append(report)

        return {"reports": report_list}

    @expose('json')
    def getCommonUserMonthlyReports(self):
        data = request.json_body
        userID = data.get("userID")
        reports = session.query(UserReports).filter_by(userID = userID).order_by(desc(UserReports.date)).all()
        report_list = []
        for i in range(min(10,len(reports))):
            year = reports[i].date.year
            month = reports[i].date.month
            report_month = str(year) + "-" + str(month)
            total_calorie_intake = reports[i].actualIntake
            daily_average_calorie_intake = reports[i].dailyAverageIntake
            report = {"report_month": report_month, "total_calorie_intake": total_calorie_intake, "daily_average_calorie_intake": daily_average_calorie_intake}
            report_list.append(report)

        return {"reports": report_list}
    
    @expose('json')
    def getDietGoalReports(self):
        data = request.json_body
        userID = data.get("userID")
        goals = session.query(DietGoal).filter_by(userID = userID).all()
        reports = []
        for goal in goals:
            dailyCalorieIntakeMaximum = goal.maxCal
            dailyCalorieIntakeMinimum = goal.minCal
            startDate = goal.startDate
            endDate = goal.endDate
            fullfilledDays = 0
            NoDataDays = 0
            notFullfilledDays = 0
            currTime = datetime.combine(startDate, datetime.min.time())
            end = datetime.combine(endDate, datetime.max.time())
            while currTime <= end:
                startTime = currTime.replace(hour=0, minute=0, second=0).replace(microsecond=0)
                endTime = currTime.replace(hour=23, minute=59, second=59).replace(microsecond=999)
                total_calories = session.query(func.sum(Dish.calorie * MealTracking.quantity)).\
                join(MealTracking, MealTracking.dishID == Dish.dishID).\
                filter(MealTracking.userID == userID).\
                filter(MealTracking.date >= startTime).\
                filter(MealTracking.date < endTime).scalar()
                total_calories = total_calories or 0
                currTime += timedelta(days=1)
                if total_calories == 0:
                    NoDataDays += 1
                elif total_calories <= dailyCalorieIntakeMaximum and total_calories >= dailyCalorieIntakeMinimum:
                    fullfilledDays += 1
                else:
                    notFullfilledDays += 1

            report = {
                'startDate': startDate,
                'endDate': endDate,
                'dailyCalorieIntakeMaximum': dailyCalorieIntakeMaximum,
                'dailyCalorieIntakeMinimum': dailyCalorieIntakeMinimum,
                'daysFullfilledGoal': fullfilledDays,
                'daysNotFullfilledGoal': notFullfilledDays,
                'daysWithoutData': NoDataDays,
                'progressPercentage': fullfilledDays / (fullfilledDays + notFullfilledDays + NoDataDays)
            }
            reports.append(report)
        return {'reports': reports}
    

#-----------GET TOP RATED DISHES------------
    @expose('json')
    def getTopTenHighestRatedDishes(self):
        data = request.json_body
        diningHallID = data.get("diningHallID")
        return {'topTenHighestRatedDishes': getTopTenRatedDishesHelper(diningHallID)}
    
#-------------GET TOP ALLERGIES-------------
    @expose('json')
    def getTopTenPriorityFoodAllergies(self):
        data = request.json_body
        diningHallID = data.get("diningHallID")
        return {'topTenPriorityFoodAllergies': getTopAllergiesHelper(diningHallID)}
    
#-------------PRIVACY SETTINGS--------------
    @expose('json')
    def setPrivacySetting(self):
        data = request.json_body
        userID = data.get("userID")
        allowToCollectData = data.get("allowToCollectData")
        user_to_update = session.query(UserProfile).filter_by(userID = userID).first()
        user_to_update.allowDataCollect = allowToCollectData
        session.commit()
        return {'message':'Privacy setting updated seccessfully.'}

    @expose('json')
    def getPrivacySetting(self):
        data = request.json_body
        userID = data.get("userID")
        user_info = session.query(UserProfile).filter_by(userID = userID).first()
        allowToCollectData = user_info.allowDataCollect
        return {'allowToCollectData':allowToCollectData}

# OUTSIDE THE CONTROLLER
#-----------GET TOP RATED DISHES------------
def getTopTenRatedDishesHelper(diningHallID):
        topRates = session.query(
        Dish.dishName,
        func.avg(UserRating.rating).label('average_rating'),
        func.count(UserRating.rating).label('rating_count')
        ).join(
            UserRating, Dish.dishID == UserRating.dishID,  # Assuming UserRating has a foreign key dish_id to Dish
        ).filter(
            Dish.diningHallID == diningHallID
        ).group_by(
            Dish.dishID
        ).order_by(
            func.avg(UserRating.rating).desc()
        ).limit(10)  # Limit to top 10 dishes
        top_ten_rated_food = []
        for topRate in topRates:
            top_ten_rated_food.append({"dish_name": topRate.dishName, "average_rating": float(round(topRate.average_rating,2)), "num_rates": topRate.rating_count})
        return top_ten_rated_food

#-----------GET TOP Allergies------------
def getTopAllergiesHelper(diningHallID):
    # Get Top 10 allergies and their percentage
    total_users = session.query(
    func.count(UserProfile.userID).label('total_users')
    ).join(
        DiningHall, DiningHall.institutionID == UserProfile.institutionID
    ).filter(
        and_(DiningHall.diningHallID == diningHallID, 
        UserProfile.allowDataCollect == True)
    ).scalar()

    topAllergies = session.query(
        Allergy.name,
        func.count(UserAllergy.userID).label('user_count')
    ).join(
        UserAllergy, UserAllergy.allergyID == Allergy.allergyID
    ).join(
        UserProfile, UserProfile.userID == UserAllergy.userID
    ).join(
        DiningHall, DiningHall.institutionID == UserProfile.institutionID
    ).filter(
        and_(DiningHall.diningHallID == diningHallID, 
        UserProfile.allowDataCollect == True)
    ).group_by(
        Allergy.name
    ).order_by(
        func.count(UserAllergy.userID).desc()
    ).limit(10)

    top_ten_allergies = []
    for topAllergy in topAllergies:
        top_ten_allergies.append({"allergy": topAllergy.name, "num_users": topAllergy.user_count, "percentage": round(topAllergy.user_count/ total_users,3)})
    return top_ten_allergies

#-----------Generate Reports----------------
schedule.clear()

# Check if today is the last day of the month.
def is_last_day_of_the_month():
    today = datetime.now()
    next_day = today.replace(day=today.day + 1)
    return today.month != next_day.month

def generate_user_report():
    # Check if today is the last day of a month
    if is_last_day_of_the_month():
        users = session.query(UserProfile).all()
        for user in users:
            userID = user.userID
            # Calculate total intake of the months
            actualIntake = 0
            current_date = datetime.now()
            first_day_of_month = current_date.replace(day=1, hour = 0, minute=0, second=0, microsecond=0)
            first_day_next_month = (first_day_of_month + timedelta(days=32)).replace(day=1, hour = 0, minute=0, second=0, microsecond=0)
            intakes = session.query(MealTracking).filter_by(userID = userID).filter(
                and_(MealTracking.date >= first_day_of_month, MealTracking.date < first_day_next_month)).all()
            for intake in intakes:
                dishID = intake.dishID
                quantity = intake.quantity
                calorie = session.query(Dish).filter_by(dishID = dishID).first().calorie
                actualIntake += calorie * quantity

            # Get the number of days of current month and daily average intake at the dining halls
            number_of_days = (first_day_next_month - first_day_of_month).days
            dailyAverageIntake = round(actualIntake / number_of_days, 2)

            new_report = UserReports(
                userID= userID,
                date = datetime.today().date(),
                actualIntake = actualIntake,
                dailyAverageIntake = dailyAverageIntake
            )
            session.add(new_report)
            session.commit()

def generate_dining_report():
    # Check if today is the last day of a month
    if is_last_day_of_the_month():
        dinings = session.query(DiningHall).all()
        for dining in dinings:
            diningHallID = dining.diningHallID
            # print(diningHallID)

            # Get Top 10 rated food
            top_ten_rated_food = getTopTenRatedDishesHelper(diningHallID)

            # Get Top 10 allergies and their percentage
            top_ten_allergies = getTopAllergiesHelper(diningHallID)

            # Get Top food preference percentage
            total_users = session.query(
            func.count(UserProfile.userID).label('total_users')
            ).join(
                DiningHall, DiningHall.institutionID == UserProfile.institutionID
            ).filter(
                and_(DiningHall.diningHallID == diningHallID, 
                UserProfile.allowDataCollect == True)
            ).scalar()
            topPreferences = session.query(
            FoodPreferences.name,
            func.count(UserPreference.userID).label('user_count')
            ).join(
                UserPreference, UserPreference.preferenceID == FoodPreferences.preferenceID
            ).join(
                UserProfile, UserProfile.userID == UserPreference.userID
            ).join(
                DiningHall, DiningHall.institutionID == UserProfile.institutionID
            ).filter(
                and_(DiningHall.diningHallID == diningHallID, 
                UserProfile.allowDataCollect == True)
            ).group_by(
                FoodPreferences.name
            ).order_by(
                func.count(UserPreference.userID).desc()
            )

            top_preferences = []
            for topPreference in topPreferences:
                top_preferences.append({"preference": topPreference.name, "num_users": topPreference.user_count, "percentage": round(topPreference.user_count/ total_users,3)})
            # print(top_ten_preferences)

            top_preferences = json.dumps(top_preferences)
            top_ten_allergies = json.dumps(top_ten_allergies)
            top_ten_rated_food = json.dumps(top_ten_rated_food)

            # Todo: Add to database
            new_report = DiningHallReport(
                diningHallID= diningHallID,
                date = datetime.today().date(),
                dietPreferences = top_preferences,
                top10PriorityFoodAllergies = top_ten_allergies,
                top10HighestRatedDishes = top_ten_rated_food
            )
            session.add(new_report)
            session.commit()
    


async def async_task():
    schedule.every().day.at("20:00").do(generate_user_report)
    schedule.every().day.at("17:00").do(generate_dining_report)
    while True:
        schedule.run_pending()
        # await asyncio.sleep(1)

def start_infinite_task():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(async_task())


task_thread = threading.Thread(target=start_infinite_task)
task_thread.start()

