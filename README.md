# Solutions Challenge 2020 Project
## Rutgers University Camden 
## Nextmeal.live

## What is NextMeal.live
    NextMeal.live is a project aimed to end food insecurity by using the problem of resturant food
    waste as a solution. NextMeal.live allows resturants to post what kinds of food they have left
    over at the end of the day so residents who cannont afford food can pick up the extra food allowing
    them to have some kind of meal at the end of the day.

## Inspiration
    We had recently learned that almost 50% of college students are food insecure while our dining hall has
    just gone all you can eat creating an imense amount of food waste. We thought that it was crazy that
    there was so much food waste when there were hungry people who can use it. We tried to turn one man's
    problem into another man's solution and use foodwaste to end food insecurity.

## Getting started
### Prerequisites
    Make sure you have npm installed (for more info go to https://www.npmjs.com/get-npm)

## Installing
First clone repo with 
```bash
git clone https://github.com/dsc-ruc/NextMeal.live.git
```
    
Next inside of the project directory run ```npm install``` to get all of the requried packages

## Backend Setup
Inside backend folder, if you use virtual environments:
```bash
python3 -m virtual env
soucre env/bin/activate
pip install -r requirements.txt
```

otherwise just use:
```bash
python3 -m pip install -r requirements.txt
```

To run the server use:
```bash
python3 manage.py runserver
```

The default port django uses is 8000.

## Data Template
```json
{
	"restaurant_name": "name",
	"address": "street name",
	"food_available": "food",
	"potential_allergies": "allergy",
	"location": {
		"0": 0.0,
		"1": 0.0
	},
	"food_available_start_time": "time as a string",
	"food_available_end_time": "time as a string"
}
```
