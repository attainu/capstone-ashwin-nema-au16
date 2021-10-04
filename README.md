<div style="text-align:center"><img src="https://res.cloudinary.com/ash006/image/upload/v1633338159/APNAMART_preview_rev_1_lmweri.jpg" alt="Apna Mart" /></div>.

# Introduction

Apnamart is an e-commerce website where you can order your essentials and get it delivered at your home. You can select your location on the map and select your means of payment. Currently the website is available only in India and you can order a maximum of 20 items of a type. Each user has to create his account for placing the order.

# Key Features
A user has to login to place an order. A user can:

1. Delete his/her account

2. Select his/her location on the map

3. Cancel his/her order within one day of placing the order

4. Make online(through Razorpay Gateway) or cash payment

5. Login with his/her Google Account

6. Track his/her order

Product image on the product page can be zoomed on the right side of the page by hovering over the image

# Key frameworks used:
<ul> 
   <li>Express.js </li>
</ul>

# Key libraries used:
<ul>
 <li> Material UI </li>
 <li> Leaflet</li>
 <li>React </li>
 <li>Redux </li>
 <li> Mongoose</li>
 <li>Google Auth Library </li>
</ul>

# Key packages used:
<ul>
<li>bcrypt </li>
<li> dotenv</li>
<li> jsonwebtoken</li>
<li> nanoid</li>
<li>opencage-api-client </li>
<li>razorpay </li>
<li>react-redux </li>
<li>redux-thunk </li>
<li>react-router-dom </li>
<li>axios </li>
<li> yup</li>
<li>react-leaflet </li>
<li>react-elastic-carousel </li>
<li>simplebar-react </li>
<li> redux-persist</li>
<li> react-use-measure</li>
<li> react-bootstrap</li>
<li> react-detect-offline</li>
<li> react-google-login</li>
<li> react-image-magnify</li>
<li> material-ui-search-bar</li>
</ul>

# Future Scope

<ul> 
<li>Ratings and reviews feature for the orders placed by the user and for the products that are sold on the website. 
</li>
<li>Implementing AI chatbot for better user experience </li>
<li> Implementing google maps instead of leaflet map for better user experience</li>
<li>Authorization using mobile number </li>
<li>Inventory management of the products sold </li>
<li>Enabling multiple sellers on the website </li>
</ul>

# Installation Guide
To use Apna Mart, you can download the repo or clone it to your local machine. You can install Apna Mart in the following steps:

Step 1: 

Open the git bash terminal in the folder where you want to clone the repository. 
Step 2: 

Type these commands in the terminal
```bash
git clone https://github.com/attainu/capstone-ashwin-nema-au16.git
```

```bash
cd capstone-ashwin-nema-au16/
```
Step 3:\
\
Go to dev branch

```bash
git checkout dev
```

Step 4:\
\
Go to the backend folder
```bash
 cd backend/
```

Step 5:\
\
Type the following command in the terminal
```bash
nodemon
```
Step 6:\
\
Go to apnamart folder
```bash
cd ../apnamart/
```

Step 7:\
\
Start the server here
```bash
npm start
```

Note: Make sure you have your own Google OAuth 2.0 Client ID,OpenCage Geocoding API key and RazorPay key