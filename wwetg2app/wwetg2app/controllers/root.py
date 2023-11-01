# -*- coding: utf-8 -*-
"""Main Controller"""

import hashlib
import tg
from webob.exc import WSGIHTTPException
from tg import expose, flash, require, url, lurl
from tg import request, redirect, tmpl_context, response
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from wwetg2app import model
from wwetg2app.controllers.secure import SecureController
from wwetg2app.model import DBSession
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController
from datetime import datetime, timedelta
from pytz import utc
import jwt
from jwt.exceptions import ExpiredSignatureError, DecodeError

from wwetg2app.lib.base import BaseController
from wwetg2app.controllers.error import ErrorController

import psycopg2
import json

from sqlalchemy import create_engine

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker


# repoze for user authentication 
# from repoze.what.predicates import not_anonymous

__all__ = ['RootController']

SECRET_KEY = 'WhatWeEat'
FOOD_PREF = ('Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian')

# For psycopg2
# conn = psycopg2.connect(database="whatweeatapp",
#                         host="localhost",
#                         user="yanglintao",
#                         password="admin",
#                         port="5432")

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

# For checking only
# class CheckConnection(Base):
#     __tablename__ = 'check_connection'
#     check1 = Column(Integer, primary_key=True)


class MealTracking(Base):
    __tablename__ = 'meal_trackings'
    userID = Column(Integer, primary_key=True)
    shoppingCart = Column(String)
    intakeRecords = Column(String)
    dishRatings = Column(Float)
    calorieIntake = Column(Float)
    fatIntake = Column(Float)
    nutrientIntake = Column(Float)

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

class DiningHallReport(Base):
    __tablename__ = 'dining_hall_reports'
    diningHallID = Column(Integer, primary_key=True)
    date = Column(Date)
    dietPreferences = Column(String)
    top10PriorityFoodAllergies = Column(String)
    top10HighestRatedDishes = Column(String)

class DailyMenu(Base):
    __tablename__ = 'daily_menus'
    menuID = Column(Integer, primary_key=True)
    date = Column(Date)
    diningHallID = Column(Integer, ForeignKey('dining_halls.diningHallID'))
    dishesID = Column(Integer) # This might need a relationship if dishes are stored in another table

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
    foodPreference = Column(Integer, ForeignKey('food_preference.preferenceID'))
    foodAllergy = Column(Integer, ForeignKey('allergy.allergyID'))
    dietPlan = Column(String)

class MonthlyReport(Base):
    __tablename__ = 'monthly_reports'
    userID = Column(Integer, ForeignKey('user_profiles.userID'), primary_key=True)
    date = Column(Date, primary_key=True)
    dietGoal = Column(Float)
    actualIntake = Column(Float)
    accompPercent = Column(Float)

class MenuItem(Base):
    __tablename__ = 'menu_items'
    dishID = Column(Integer, primary_key=True)
    name = Column(String)
    category = Column(String)
    ingredients = Column(String)
    allergens = Column(String)
    dietaryTags = Column(String)
    calories = Column(Float)

def init_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(bind=engine)
    # Add food preferences
    food_preferences = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian']
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
                token = jwt.encode({'user_id': user_email.userID, 'role': role, 'exp': datetime.now(utc) + timedelta(minutes=1)}, SECRET_KEY, algorithm="HS256")
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
    # dining hall adds a new item to an existing daily menu
    def addMenuItem(self):
        data = request.json_body
        menuID = data.get("menuID")
        name = data.get("name")
        catogory = data.get("catagoty")
        ingredients = data.get("ingredients")
        allergens = data.get("allergens")
        calories = data.get("calories")
        dietaryTags = data.get("diataryTags")
        # check if the menu exists
        menuExit = session.query(DailyMenu).filter_by(menuID = menuID).first()
        if not menuExit:
            return {"message":"Menu doesn't exist."}
        # the list of new MenuItem
        item = MenuItem(
            dishID = session.query(MenuItem).count() + 1,
            name = name,
            catogory = catogory,
            ingredients = ingredients,
            allergens = allergens,
            dietaryTags = dietaryTags,
            calories = calories,
        )
        # add new MenuItems to the existing DailyMenu
        oldMenu = session.query(DailyMenu).filter_by(menuID = menuID).first()
        oldMenu.dishesID.append(dishList) #### ??
        return {"message":"finish uploading"}, dishList
#---------PREFERENCE & ALLERGY--------------
    # return a list of string of user's preference
    def getUserPreference(self):
        data = request.json_body
        userID = data.get('userID')
        if userID:
            # userID
            user = session.query(UserProfile).filter_by(userID = userID).first()
            preferenceID = user.foodPreference.preferenceID
            preferenceEntries = session.query(FoodPreferences).filter(FoodPreferences.preferenceID == preferenceID).all()
            # Extracting the names
            nameList = [str(p[0]) for p in preferenceEntries]
            return nameList, {"message": "User preferences returned"}
        else:
            return {"message": "User doesn't exist"}

    # upadate everything in the preference about that user
    # Assume userPref has correct number of tags and all tags are in the FOOD_PREF
    def updateUserPreference(self):
        data = request.json_body
        userID = data.get("userID")
        userPref = data.get("userID") # a list of strings

        if userID:
            user = session.query(UserProfile).filter_by(userID = userID).first()
            preferenceID = user.foodPreference.preferenceID
            preferenceEntries = session.query(FoodPreferences).filter(FoodPreferences.preferenceID == preferenceID).all()
            # delete the old entries
            for preference in preferenceEntries:
                session.delete(preference)
            # add the new entries 
            if len(userPref) > len(FOOD_PREF):
                return {"message": "Too many tags"}
            for p in range(len(userPref)):
                newPref = FoodPreferences(
                    name = userPref[p],
                    preferenceID = preferenceID
                )
            session.commit()
            return {"message":"Update sucessful"}
        else:
            return {"message":"User doesn't exist"}
            
                






#---------UPLOAD MENU & MENUITEM------------
    @expose('json')
    # dining hall update an existing menu item on an existing menu
    def updateMenuItem(self):
        data = request.json_body
        menuID = data.get("menuID")
        dishID = data.get("dishID")
        # check if the menu exists
        menuExit = session.query(DailyMenu).filter_by(menuID = menuID).first()
        if not menuExit:
            return {"message":"Menu doesn't exist."}
        # check if the menu item exists
        itemExit = session.query(MenuItem).filter_by(dishID = dishID).first()
        if not menuExit:
            return {"message":"Menu doesn't exist."}
    
    # delete a menu item
    @expose('json')
    def deleteMenuItem(self, dishID):
        # check existence
        item = session.query(MenuItem).filter_by(dishID = dishID).first()
        # delete item
        if item:
            session.delete(item)
            session.commit()
        else:
            return {"message":"Item not found or already deleted"}
    
    # delete a menu, and its items
    @expose('json')
    def deleteMenu(self):
        menuID = data.get("menuID")
        menu = session.query(DailyMenu).filter_by(menuID = menuID).first()
        if menu:
            # delete all dish itmes having the same menuID
            subquery = session.query(MenuItem.menuID).group_by(MenuItem.menuID).having(func.count(MenuItem.menuID) >= 1).subquery()
            allItems = session.query(MenuItem.menuID).filter(MenuItem.menuID.in_(subquery))
            allID = [id[0] for id in allItems]
            for i in allID:
                deleteMenuItem(i)
            # delete the menu
            session.delete(menu)
            session.commit()
            return {"message":"Menu deleted."}
        else:
            return {"message":"Menu doesn't exist."}
        
    # dining hall create a new daliy menu
    def createDaliyMenu(self):
        data = request.json_body
        menuID = data.get("menuID")
        date = data.get("date")
        diningHallID = data.get("diningHallID")
        # create a DaliyMenu object, and add the MenuItems to it
        menu = DailyMenu(
            menuID = menuID,
            date = date,
            diningHallID = diningHallID,
            dishesID = None #??????
        )
         # create a list of MenuItems
        dishList = self.uploadDiningHallMenu(menu.menuID)[1] #????
        return {"message": "Menu created"}



    @expose('json')
    def register_common(self):

        data = request.json_body
        email = data.get('email')
        password = data.get('password')
        user_email = session.query(UserProfile).filter_by(email=email).first()

        if user_email:
            flash(email)
            return {"message": "This email has already been registered"}
        else:
            try:    
                # Insert rows
                user_num = session.query(UserProfile).count()
                flash(user_num)
                hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
                new_common = UserProfile(
                    userID = user_num + 1,
                    email = email,
                    password = hashed_password
                    # add preference and allergy ID ???
                )
                session.add(new_common)
                session.commit()
                return {"message": "Registration success"}
            except Exception as e:
                    session.rollback()
                    return {"message": f"Error: {str(e)}"}
        
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
            elif role == "dining":
                user = session.query(DiningHall).filter_by(diningHallID=user_id).first()

            if not user:
                return {"status": "error", "message": "Invalid user."}

            # Compare last_login with current time
            if datetime.now() > expiration:
                return {"status": "error", "message": "Login expired."}

            return {"status": "success", "message": "User is logged in."}

        except ExpiredSignatureError:
            return {"status": "error", "message": "Token has expired."}
        except DecodeError:
            return {"status": "error", "message": "Token is invalid."}



Session = sessionmaker(bind = engine)
session = Session()

def register_common(email, password):
    user_email = session.query(UserProfile).filter_by(email=email).first()

    if user_email:
        #flash(email)
        return {"message": "This email has already been registered"}
    else:
        # Insert rows
        user_num = session.query(UserProfile).count()
        #flash(user_num)
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        new_common = UserProfile(
            userID = user_num + 1,
            email = email,
            password = hashed_password
        )
        # flash(userID, email, password)
        session.add(new_common)
        session.commit()
        return {"message": "Registration success"}
# Register for dining hall
#   Assume: 1) the pw has been checked in front end
#   Input: name, password, institution_id - provided by the dining hall user
#   Report error if: 1) name already exists 2) the institution doesn't exist --> return msg
#   If success: add the new dining hall to the table -->return msg


    
# Register for Institution
# After registering, generate unique id, and add the new institution to table.
# No login, password for it
def register_institution(name):
    institution_exist = session.query(Institution).filter_by(name=name).first()
    if institution_exist:
        flash(_('The institution name already exists.'), 'error')
        return {"message": "The institution name already exists."}
    else:
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
        return {"message": "Institution register success"}
    

def register_dininghall(email, name, institution_id, password):
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

# Tests
# name = "College C"
# register_institution(name)
# name = "DiningHall_A"
# institution_id = 3
# password = "pw"
# register_dininghall(name, institution_id, password)


# Common users login with their emails and passwords.
# Dining hall users login with their dining hall IDs and passwords.
# Type: email ID -- string, pwd -- string, role -- string ("common" or "dining")
def login(emailID, pwd, role):   
    if role == "common":
        user_email = session.query(UserProfile).filter_by(email=emailID).first()
        if not user_email:
            return {"message":"user email or password not correct"}
        else:
            password = session.query(UserProfile).filter_by(email=emailID).first().password
            if hashlib.sha256(pwd.encode('utf-8')).hexdigest() == password:
                return {"message": "login success for a common user"}
            else:
                return {"message":"user email or password not correct"}
    if role == "dining":
        dining_email = session.query(DiningHall).filter_by(email=emailID).first()
        if not dining_email:
            # flash("dining hall email or password not correct")
            return {"message":"dining hall email or password not correct"}
        else:
            password = session.query(DiningHall).filter_by(email = emailID).first().password
            if hashlib.sha256(pwd.encode('utf-8')).hexdigest() == password:
                # flash("login success for a dining hall user")
                return {"message": "login success for a dining hall user"}
            else:
                # flash("Dining ID or password not correct")
                return {"message":"Dining ID or password not correct"}
            
# @expose('json')
# def register_user(self, email, userID, password):
#     response = register_common(email, userID, password)
#     return response

# Tests
# login("123@nyu.edu", "123", "dining")