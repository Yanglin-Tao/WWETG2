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
'Beef, Hamburger Bun, Bacon, American Cheese', '[None]', 1, 'Main');