INSERT INTO "institutions" ("institutionID", "name") VALUES (1, 'New York University');
INSERT INTO "institutions" ("institutionID", "name") VALUES (2, 'Boston University');

-- password before hash: JasperKane123!
INSERT INTO "dining_halls" ("email", "diningHallID", "institutionID", "name", 
"password", "address") VALUES ('jasper@nyu.edu', 1, 1, 'Jasper Kane', 
'ae68d82463d686cc6e20eae98315a3ef09ed741038685585e1b16579a7ba98cf', '6 Metrotech Center');

-- password before hash: Lipton123!
INSERT INTO "dining_halls" ("email", "diningHallID", "institutionID", "name", 
"password", "address") VALUES ('lipton@nyu.edu', 2, 1, 'Lipton', 
'72a9a2e7d6e87127a8b5d9d381d582eeb60913a7d059ade60dee870c244672be', '33 Washington Square W');

-- password before hash: Downstein123!
INSERT INTO "dining_halls" ("email", "diningHallID", "institutionID", "name", 
"password", "address") VALUES ('downstein@nyu.edu', 3, 1, 'Downstein', 
'c5671e329aacd9e2c651f59781a57b88b1877f072ef42aaee0dfcd18cc33d04c', '5-11 University Pl');

-- password before hash: FFCo123!
INSERT INTO "dining_halls" ("email", "diningHallID", "institutionID", "name", 
"password", "address") VALUES ('ffco@bu.edu', 4, 2, 'The Fresh Food Co.', 
'3cb2839ba7b8e5c32cd3da71789dd03488e0043d38912b280a22cb322e462169', 'Central Campus');

INSERT INTO "allergy" ("allergyID", "name") VALUES (1, 'egg');
INSERT INTO "allergy" ("allergyID", "name") VALUES (2, 'milk');
INSERT INTO "allergy" ("allergyID", "name") VALUES (3, 'fish');
INSERT INTO "allergy" ("allergyID", "name") VALUES (4, 'almond');
INSERT INTO "allergy" ("allergyID", "name") VALUES (5, 'peanut');
INSERT INTO "allergy" ("allergyID", "name") VALUES (6, 'wheat');
INSERT INTO "allergy" ("allergyID", "name") VALUES (7, 'soybean');
INSERT INTO "allergy" ("allergyID", "name") VALUES (8, 'sesame');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (1, 1, 'Bacon Cheeseburger', 500, 
'Beef, Hamburger Bun, Bacon, American Cheese', '["None"]', 1, 'Main');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (2, 1, 'Veggie Fries', 310, 
'Black bean, Hamburger Bun, Tomatoes, Lettuce Leaf, Oil', '["Halal", "Vegetarian", "Balanced", "Vegan",
"Pescatarian"]', 1, 'Main');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (3, 1, 'French Fries', 150, 
'Potato, Oil, Salt', '["None"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (4, 1, 'Buffalo Wings', 690, 
'Chicken, Buffalo Wing Sauce, Blue Cheese Dressing, Celery', '["Gluten Free"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (5, 1, 'Cola', 182, 
'Cola', '["Halal", "Vegetarian", "Gluten Free", "Vegan", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (6, 1, 'Plain Coffee', 3, 
'Coffee', '["Halal", "Vegetarian", "Vegan", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (7, 1, 'Latte', 200, 
'Coffee, Milk, Sugar', '["Halal", "Vegetarian", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (8, 2, 'Carrot Cake Muffin', 220, 
'Muffin Mix, Carrot, Pure Vanilla Extract, Cinnamon, Ginger, Nutmeg', '["Halal", "Vegetarian", "Pescatarian"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (9, 2, 'Pork Sausage Patty', 360, 
'Pork', '["Gluten Freen"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (10, 2, 'Eggs', 170, 
'Egg', '["Halal", "Vegetarian", "Balanced", "Gluten Free", "Pescatarian"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (11, 2, 'Sauteed Broccoli', 50, 
'Broccoli, Salt', '["Halal", "Vegetarian", "Balanced", "Vegan", "Gluten Free", "Pescatarian"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (12, 2, 'Brown Rice Salad', 140, 
'Brown Rice, Chick peas, Cucumber, Green Bell Peppers, Green Onions, Red Bell Peppers, Parsley,
 White Wine Vinegar, Cilantro, Lemon Juice, Canola Oil, Honey, Salt, Oregano, Garlic, Black Pepper', 
 '["Halal", "Vegetarian", "Balanced", "Pescatarian"]', 1, 'Main');

 INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (13, 2, 'Apple Juice', 113, 
'Apple, Sugar', '["Halal", "Vegetarian", "Vegan", "Gluten Free", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (14, 3, 'French Fries', 145, 
'Potato, Oil, Salt', '["None"]', 1, 'Side');

 INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (15, 3, 'Orange Juice', 110, 
'Apple, Sugar', '["Halal", "Vegetarian", "Vegan", "Gluten Free", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (16, 3, 'Jasmine Rice', 140, 
'Jasmine Rice, Canola Oil, Salt, Parsley', '["Halal", "Vegetarian", "Vegan", "Gluten Free", "Pescatarian"]', 
1, 'Main');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (17, 3, 'Marinated Tofu', 110, 
'Tofu, Unseasoned Rice Wine Vinegar, Soy Sauce, Sesame Tahini Paste, Sesame Oil, Thick and Easy, 
Green Onions, Hot Chili Sauce, Ginger, Garlic, Cilantro', '["Halal", "Balanced", "Vegetarian", "Vegan",
 "Pescatarian"]', 1, 'Main');

 INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (18, 3, 'Grilled Chicken', 150, 
'Chicken, Canola Oil, Salt, Black Pepper', '["Gluten Freen"]', 1, 'Main');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (19, 4, 'Sauteed Broccoli', 50, 
'Broccoli, Salt', '["Halal", "Vegetarian", "Balanced", "Vegan", "Gluten Free", "Pescatarian"]', 1, 'Side');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (20, 4, 'Brown Rice Salad', 140, 
'Brown Rice, Chick peas, Cucumber, Green Bell Peppers, Green Onions, Red Bell Peppers, Parsley,
 White Wine Vinegar, Cilantro, Lemon Juice, Canola Oil, Honey, Salt, Oregano, Garlic, Black Pepper', 
 '["Halal", "Vegetarian", "Balanced", "Pescatarian"]', 1, 'Main');

 INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (21, 4, 'Apple Juice', 113, 
'Apple, Sugar', '["Halal", "Vegetarian", "Vegan", "Gluten Free", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (22, 4, 'French Fries', 145, 
'Potato, Oil, Salt', '["None"]', 1, 'Side');

 INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (23, 4, 'Orange Juice', 110, 
'Apple, Sugar', '["Halal", "Vegetarian", "Vegan", "Gluten Free", "Pescatarian"]', 1, 'Drink');

INSERT INTO "dish" ("dishID", "diningHallID", "dishName", "calorie", "ingredients",
"categories", "servingSize", "type") VALUES (24, 4, 'Jasmine Rice', 140, 
'Jasmine Rice, Canola Oil, Salt, Parsley', '["Halal", "Vegetarian", "Vegan", "Gluten Free", "Pescatarian"]', 
1, 'Main');

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(1, '2023-10-30', 1);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(2, '2023-10-31', 1);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(3, '2023-11-01', 1);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(4, '2023-10-30', 2);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(5, '2023-10-31', 2);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(6, '2023-11-01', 2);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(7, '2023-10-31', 3);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(8, '2023-11-01', 3);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(9, '2023-10-31', 4);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES 
(10, '2023-11-01', 4);

INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (1,1);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (2,1);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (4,1);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (6,1);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (2,2);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (3,2);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (4,2);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (5,2);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (6,2);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (7,2);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (1,3);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (2,3);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (4,3);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (6,3);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (8,4);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (9,4);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (10,4);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (11,4);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (12,4);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (13,4);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (8,5);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (9,5);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (10,5);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (11,5);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (12,5);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (8,6);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (11,6);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (12,6);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (13,6);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (15,7);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (16,7);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (14,8);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (15,8);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (16,8);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (17,8);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (18,8);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (19,9);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (20,9);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (21,9);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (22,9);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (23,9);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (24,9);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (19,10);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (20,10);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (21,10);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (22,10);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (23,10);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (24,10);

-- All common user passwords before hash: Abc123!!
INSERT INTO "user_profiles" ("userID", "email", "password", "institutionID") VALUES (1, 'user1@nyu.edu', 
'09d723dcba27c57054faa197e630226df6a40eb322bf565ff532b74bf81e2952', 1);
INSERT INTO "user_profiles" ("userID", "email", "password", "institutionID") VALUES (2, 'user2@nyu.edu', 
'09d723dcba27c57054faa197e630226df6a40eb322bf565ff532b74bf81e2952', 1);
INSERT INTO "user_profiles" ("userID", "email", "password", "institutionID") VALUES (3, 'user3@bu.edu', 
'09d723dcba27c57054faa197e630226df6a40eb322bf565ff532b74bf81e2952', 2);
INSERT INTO "user_profiles" ("userID", "email", "password", "institutionID") VALUES (4, 'user4@nyu.edu', 
'09d723dcba27c57054faa197e630226df6a40eb322bf565ff532b74bf81e2952', 1);

INSERT INTO "user_preference" ("userID", "preferenceID") VALUES (1,1);
INSERT INTO "user_preference" ("userID", "preferenceID") VALUES (2,2);
INSERT INTO "user_preference" ("userID", "preferenceID") VALUES (2,4);
INSERT INTO "user_preference" ("userID", "preferenceID") VALUES (3,3);
INSERT INTO "user_preference" ("userID", "preferenceID") VALUES (4,3);

INSERT INTO "user_allergy" ("userID", "allergyID") VALUES (1,5);
INSERT INTO "user_allergy" ("userID", "allergyID") VALUES (1,3);
INSERT INTO "user_allergy" ("userID", "allergyID") VALUES (2,3);
INSERT INTO "user_allergy" ("userID", "allergyID") VALUES (3,1);
INSERT INTO "user_allergy" ("userID", "allergyID") VALUES (4,1);

INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (1, 4, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (1, 6, 2);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 2, 3);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 3, 3);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 4, 2);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 6, 4);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 7, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 8, 4);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 10, 4);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 11, 2);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 15, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (2, 16, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (3, 21, 4);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (3, 22, 2);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (3, 23, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (3, 24, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (4, 2, 3);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (4, 4, 3);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (4, 6, 2);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (4, 15, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (4, 16, 5);
INSERT INTO "user_rating" ("userID", "dishID", "rating") VALUES (4, 18, 5);

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (1, '2023-09-30', '[{"preference": "Balanced", "num_users": 1, "percentage": 0.333}, {"preference": "Gluten Free", "num_users": 1, "percentage": 0.333}, {"preference": "Halal", "num_users": 1, "percentage": 0.333}]', 
'[{"allergy": "fish", "num_users": 2, "percentage": 0.667}, {"allergy": "egg", "num_users": 1, "percentage": 0.333}, {"allergy": "peanut", "num_users": 1, "percentage": 0.333}]', 
'[{"dish_name": "Latte", "average_rating": 5.0, "num_rates": 1}, {"dish_name": "Buffalo Wings", "average_rating": 3.33, "num_rates": 3}, {"dish_name": "Veggie Fries", "average_rating": 3.0, "num_rates": 2}, {"dish_name": "French Fries", "average_rating": 3.0, "num_rates": 1}, {"dish_name": "Plain Coffee", "average_rating": 2.5, "num_rates": 2}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (2, '2023-09-30', '[{"preference": "Balanced", "num_users": 1, "percentage": 0.333}, {"preference": "Gluten Free", "num_users": 1, "percentage": 0.333}, {"preference": "Halal", "num_users": 1, "percentage": 0.333}]',
'[{"allergy": "fish", "num_users": 2, "percentage": 0.667}, {"allergy": "egg", "num_users": 1, "percentage": 0.333}, {"allergy": "peanut", "num_users": 1, "percentage": 0.333}]', 
'[{"dish_name": "Carrot Cake Muffin", "average_rating": 4.0, "num_rates": 1}, {"dish_name": "Eggs", "average_rating": 5, "num_rates": 1}, {"dish_name": "Sauteed Broccoli", "average_rating": 2.0, "num_rates": 1}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (3, '2023-09-30', '[{"preference": "Balanced", "num_users": 1, "percentage": 0.333}, {"preference": "Gluten Free", "num_users": 1, "percentage": 0.333}, {"preference": "Halal", "num_users": 1, "percentage": 0.333}', 
'[{"allergy": "fish", "num_users": 2, "percentage": 0.667}], {"allergy": "egg", "num_users": 1, "percentage": 0.333}, {"allergy": "peanut", "num_users": 1, "percentage": 0.333}]',
'[{"dish_name": "Orange Juice", "average_rating": 5.0, "num_rates": 2}, {"dish_name": "Jasmine Rice", "average_rating": 5.0, "num_rates": 2}, {"dish_name": "Grilled Chicken", "average_rating": 4.0, "num_rates": 1}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (4, '2023-09-30', '[{"preference": "Gluten Free", "num_users": 1, "percentage": 1.0}]', 
'[{"allergy": "egg", "num_users": 1, "percentage": 1.0}]', 
'[{"dish_name": "Orange Juice", "average_rating": 5.0, "num_rates": 1}, {"dish_name": "Jasmine Rice", "average_rating": 5.0, "num_rates": 1}, {"dish_name": "Apple Juice", "average_rating": 4.0, "num_rates": 1}, {"dish_name": "French Fries", "average_rating": 3.0, "num_rates": 1}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (1, '2023-10-31', '[{"preference": "Balanced", "num_users": 1, "percentage": 0.333}, {"preference": "Gluten Free", "num_users": 1, "percentage": 0.333}, {"preference": "Halal", "num_users": 1, "percentage": 0.333}, {"preference": "Vegetarian", "num_users": 1, "percentage": 0.333}]', 
'[{"allergy": "fish", "num_users": 2, "percentage": 0.667}, {"allergy": "egg", "num_users": 1, "percentage": 0.333}, {"allergy": "peanut", "num_users": 1, "percentage": 0.333}]', 
'[{"dish_name": "Latte", "average_rating": 5.0, "num_rates": 1}, {"dish_name": "Buffalo Wings", "average_rating": 3.33, "num_rates": 3}, {"dish_name": "Veggie Fries", "average_rating": 3.0, "num_rates": 2}, {"dish_name": "French Fries", "average_rating": 3.0, "num_rates": 1}, {"dish_name": "Plain Coffee", "average_rating": 2.67, "num_rates": 3}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (2, '2023-10-31', '[{"preference": "Balanced", "num_users": 1, "percentage": 0.333}, {"preference": "Gluten Free", "num_users": 1, "percentage": 0.333}, {"preference": "Halal", "num_users": 1, "percentage": 0.333}, {"preference": "Vegetarian", "num_users": 1, "percentage": 0.333}]', 
'[{"allergy": "fish", "num_users": 2, "percentage": 0.667}, {"allergy": "egg", "num_users": 1, "percentage": 0.333}, {"allergy": "peanut", "num_users": 1, "percentage": 0.333}]', 
'[{"dish_name": "Carrot Cake Muffin", "average_rating": 4.0, "num_rates": 1}, {"dish_name": "Eggs", "average_rating": 4.0, "num_rates": 1}, {"dish_name": "Sauteed Broccoli", "average_rating": 2.0, "num_rates": 1}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (3, '2023-10-31', '[{"preference": "Balanced", "num_users": 1, "percentage": 0.333}, {"preference": "Gluten Free", "num_users": 1, "percentage": 0.333}, {"preference": "Halal", "num_users": 1, "percentage": 0.333}, {"preference": "Vegetarian", "num_users": 1, "percentage": 0.333}]', 
'[{"allergy": "fish", "num_users": 2, "percentage": 0.667}, {"allergy": "egg", "num_users": 1, "percentage": 0.333}, {"allergy": "peanut", "num_users": 1, "percentage": 0.333}]',
'[{"dish_name": "Orange Juice", "average_rating": 5.0, "num_rates": 2}, {"dish_name": "Jasmine Rice", "average_rating": 5.0, "num_rates": 2}, {"dish_name": "Grilled Chicken", "average_rating": 5.0, "num_rates": 1}]');

INSERT INTO "dining_hall_reports" ("diningHallID", "date", "dietPreferences", "top10PriorityFoodAllergies", 
"top10HighestRatedDishes") VALUES (4, '2023-10-31', '[{"preference": "Gluten Free", "num_users": 1, "percentage": 1.0}]', 
'[{"allergy": "egg", "num_users": 1, "percentage": 1.0}]', 
'[{"dish_name": "Orange Juice", "average_rating": 5.0, "num_rates": 1}, {"dish_name": "Jasmine Rice", "average_rating": 5.0, "num_rates": 1}, {"dish_name": "Apple Juice", "average_rating": 4.0, "num_rates": 1}, {"dish_name": "French Fries", "average_rating": 2.0, "num_rates": 1}]');

INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-22 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-22 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-22 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-22 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-23 13:10:00', 1, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-23 17:40:00', 13, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-23 17:40:00', 10, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-23 17:40:00', 9, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-24 18:27:15', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-24 18:27:15', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-25 07:14:12', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-25 07:14:12', 17, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-25 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-25 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-25 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-25 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-26 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-26 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-26 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-26 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-27 13:10:00', 1, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-27 17:40:00', 13, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-27 17:40:00', 10, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-27 17:40:00', 9, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-28 18:27:15', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-28 18:27:15', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-29 07:14:12', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-29 07:14:12', 17, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-29 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-29 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-29 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-29 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-30 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-30 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-30 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-30 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-31 13:10:00', 1, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-31 17:40:00', 13, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-31 17:40:00', 10, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-10-31 17:40:00', 9, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-11-01 18:27:15', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (1, '2023-11-01 18:27:15', 11, 1);

INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-23 07:57:00', 3, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-23 07:57:00', 6, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-23 11:57:00', 7, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-24 18:27:15', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-24 18:27:15', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-25 11:50:24', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-25 17:40:00', 14, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-25 17:40:00', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-25 17:40:00', 17, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-26 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-26 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-26 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-26 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-27 12:26:00', 10, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-27 12:26:00', 15, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-28 11:10:43', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-29 07:57:00', 3, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-29 07:57:00', 6, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-29 11:57:00', 7, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-30 18:27:15', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-30 18:27:15', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-31 11:50:24', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-31 17:40:00', 14, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-31 17:40:00', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-10-31 17:40:00', 17, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-01 12:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-01 12:30:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-01 18:30:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-01 18:30:00', 11, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-02 12:26:00', 10, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-02 12:26:00', 15, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (2, '2023-11-03 11:10:43', 8, 1);

INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-22 17:11:18', 20, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-22 17:11:18', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-23 13:52:40', 21, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-23 13:52:40', 22, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-24 12:30:00', 19, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-24 12:30:00', 23, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-24 12:30:00', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-24 17:11:18', 20, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-24 17:11:18', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-25 17:11:18', 20, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-25 17:11:18', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-26 13:52:40', 21, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-26 13:52:40', 22, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-27 12:30:00', 19, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-27 12:30:00', 23, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-27 12:30:00', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-27 17:11:18', 20, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-27 17:11:18', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-28 13:52:40', 21, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-28 13:52:40', 22, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-29 12:30:00', 19, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-29 12:30:00', 23, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-29 12:30:00', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-30 17:11:18', 20, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-30 17:11:18', 24, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-31 13:52:40', 21, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-10-31 13:52:40', 22, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-11-01 12:30:00', 19, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-11-01 12:30:00', 23, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (3, '2023-11-01 12:30:00', 24, 1);

INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-24 11:25:52', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-24 11:25:52', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-24 18:51:34', 12, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-24 18:51:34', 10, 2);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-24 18:51:34', 13, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-25 7:31:47', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-25 17:40:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-25 17:40:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-25 17:40:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-26 12:30:00', 15, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-26 12:30:00', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-26 12:30:00', 18, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-26 18:30:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-27 7:31:47', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-27 17:40:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-27 17:40:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-27 17:40:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-28 12:30:00', 15, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-28 12:30:00', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-28 12:30:00', 18, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-28 18:30:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-29 7:31:47', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-29 17:40:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-29 17:40:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-29 17:40:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-30 12:30:00', 15, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-30 12:30:00', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-30 12:30:00', 18, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-30 18:30:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-31 7:31:47', 8, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-31 17:40:00', 2, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-31 17:40:00', 4, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-10-31 17:40:00', 6, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-11-01 12:30:00', 15, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-11-01 12:30:00', 16, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-11-01 12:30:00', 18, 1);
INSERT INTO "meal_trackings" ("userID", "date", "dishID", "quantity") VALUES (4, '2023-11-01 18:30:00', 2, 1);

INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (1, '2023-10-29', '2023-10-31', 1350, 1950);
INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (1, '2023-11-01', '2023-11-30', 1400, 2000);
INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (2, '2023-10-29', '2023-11-30', 2100, 2550);
INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (3, '2023-10-30', '2023-10-31', 1400, 2000);
INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (3, '2023-11-01', '2023-11-30', 1500, 2000);
INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (4, '2023-10-29', '2023-10-31', 1350, 1950);
INSERT INTO "diet_goal" ("userID", "startDate", "endDate", "minCal", "maxCal") VALUES (4, '2023-11-01', '2023-11-30', 1400, 2000);

INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(1, '2023-09-30', 46500, 1550);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(2, '2023-09-30', 72000, 2400);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(3, '2023-09-30', 55200, 1880);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(4, '2023-09-30', 56400, 1430);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(1, '2023-10-31', 46500, 1500);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(2, '2023-10-31', 74400, 2400);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(3, '2023-10-31', 40920, 1320);
INSERT INTO "user_reports" ("userID", "date", "actualIntake", "dailyAverageIntake") VALUES 
(4, '2023-10-31', 44330, 1430);



INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES (11, '2023-11-26', 1);

INSERT INTO "daily_menu" ("menuID", "date", "diningHallID") VALUES (12, '2023-11-27', 1);

INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (1,11);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (3,11);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (5,11);

INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (2,12);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (4,12);
INSERT INTO "menu_dish" ("dishID", "menuID") VALUES (6,12);