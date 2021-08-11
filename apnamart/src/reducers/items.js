const initialState = [
    {
        category: "Snacks", subcategories: [
            {
                name: "Chocolate", items: [
                    {
                        name: "Cadbury 5 Star Chocolate Bar 40 g", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/5_start_avju2j.jpg",
                        description: "Cadbury 5 Star Chocolate Bar is chocolate for those everyday moments of joy that you want to share with your near and dear ones with something sweet. A delicious indulgent in the combination of chocolate, caramel and nougat that gives you longer-lasting chewy multi-textured chocolate eating experience. Go ahead, buy Cadbury 5 Star Chocolate Bar online today and experience the moment of pure magic!",
                        price: 10, details: { "Brand": "Cadbury", "Manufacturer": "Mondelez India Foods Pvt Limited", "Country of Origin": "India", "Food Prference": "Vegeterian" }
                    },

                    {
                        name: "Nestle Kitkat Bars  (37.3 g)", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/kitkat_ctropy.jpg",
                        description: "You can fuel up your energy in between hectic work presentations by taking a break and munching on the delicious Nestle KITKAT bars. Coated with the deliciousness of chocolate, these crunchy bars add sweetness and fun to your breaks while treating your taste buds to their delectable flavour. Plus, these bars have been made with vegetarian ingredients and produced with care in Ponda, a scenic city in Goa.",
                        price: 25, details: { "Brand": "Nestle", "Model Name": "Kitkat", "Country of Origin": "India", "Food Prference": "Vegeterian", "Type": "Milk Chocolate", "Maximum Shelf Life": "8 Months", "Gourmet": "No", "Gift Pack": "No" }
                    }
                ]
            },

            {
                name: "Biscuits", items: [
                    {
                        name: "Britannia Good Day Cashew Cookies, 200 g", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/good_day_biscuit_zaxmkf.jpg",
                        description: "Britannia Good Day Cashew Cookies are delicious crunchy cookies made with rich cashews. These melt in mouth cookies with their delicious nutty taste are perfect with a cup of tea or to satisfy those mid meal hunger pangs.   Britannia biscuits, cookies, cakes and rusk are a perfect companion for your tea. Believing in delivering wholesome and delicious products, Britannia India manufactures some of India's favourite brands like 50-50, Tiger, NutriChoice, Bourbon, Milk Bikis and Marie Gold.",
                        price: 35, details: { "Brand": "Britannia", "Manufacturer": "Britannia Industries Limited", "Country of Origin": "India", "Food Prference": "Vegeterian", "Flavour": "Cashew" }
                    },

                    {
                        name: "Parle Gluco Biscuits - Parle-G, 50 g Pouch", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/parleg_biscuit_rmbktb.jpg",
                        description: "Parle-G Original Glucose Biscuits are filled with the goodness of milk and wheat. Parle-G has been a source of all-round nourishment for growing kids and it has also been an all-time favourite choice for years. Whatever be the occasion, it has always been around to fight the hunger pangs. So, go ahead and get your pack of Parle-G Biscuits online now",
                        price: 65, details: { "Brand": "Parle", "Country of Origin": "India", "Food Prference": "Vegeterian", "Manufacturer": "Parle Products Pvt. Ltd." }
                    }
                ]
            }
        ]
    },

    {
        category: "Bathroom and laundry", subcategories: [
            {
                name: "Handwash", items: [
                    {
                        name: "Dettol Liquid Handwash - Original 200 ml", image: "https://res.cloudinary.com/ash006/image/upload/v1628168555/dettol_handwash_puwufr.jpg",
                        description: `Dettol’s Trusted Germ Protection formula that keeps you healthy and protected from 100 illness causing germs
                        Use Dettol Liquid Hand wash to protect transference of germs from your hands
                        Dermatologically tested; 10X better protection vs ordinary hand wash soaps`,
                        price: 79, details: { "Brand": "Dettol", "Item Form": "Liquid", "Country of Origin": "India","Skin Type	":"All" }
                    },

                    {
                        name: "Lifebuoy Total 10 Handwash Refill (Super Saver Rs 70) 750 ml 29 Review(s)", image: "https://res.cloudinary.com/ash006/image/upload/v1628168557/lifeboy_handwash_dxcrcv.jpg",
                        description: "Lifebuoy Hand Wash makes hand washing quicker and more effective than ever before!, Lifebuoy Hand Wash gives 99.9% germ protection in just 10 seconds.seconds.LB total 10, is specially designed to give you the protection you and your family need. It will leave your skin feeling protected, cleansed and refreshed. Lifebuoy Hand wash prevents the spread of germs, keeping the family safe from 10 infection causing germs. Approved by the Royal Society of Public Health",
                        price: 70, details: { "Brand": "LIFEBUOY", "Model Name": "Total 10 Hand Wash Refill", "Country of Origin": "India", "Product Type": "Handwash", "Fragrance": "Fresh" }
                    }
                ]
            },

            {
                name: "Detergents", items: [
                    {
                        name: "Surf Excel Washing Powder, 500g", image: "https://res.cloudinary.com/ash006/image/upload/v1628533407/surf_excel_sb0fx9.jpg",
                        description: "Surf Excel Easy Wash Detergent Powder is a superfine powder that removes tough stains in a jiffy and leaves no residue on your clothes. Being a superfine and fluffy powder, it dissolves easily and reaches the stain and removes it easily. Its engineered formula, with a superior technology, unleashes the power of 10 hands that is effective in removing the toughest of stains such as those of mud, ink, oil, ketchup, curry stain, and chocolate very easily.",
                        price: 45, details: { "Brand": "Surf Excel", "Scent	": "Lemon", "Country of Origin": "India", "Item Form": "Powder" }
                    },

                    {
                        name: "Nirma Surf Detergent 1Kg", image: "https://res.cloudinary.com/ash006/image/upload/v1628168557/nirma_uv9pao.jpg",
                        description: "Nirma detergent powders make sure better clean-up action. Under hygienic conditions, these detergents are formulated using natural ingredients in exact composition, then, ensuring their longer and effectiveness shelf life",
                        price: 44, details: { "Brand": "Nirma Washing Powder, Pack Size: 1 Kg", "Country of Origin": "India", "Form": "Powder" }
                    }
                ]
            }
        ]
    },

    {
        category: "Staples", subcategories: [
            {
                name: "Atta", items: [
                    {
                        name: "Amul Whole Wheat Atta, 5 kg", image: "https://res.cloudinary.com/ash006/image/upload/v1628168555/amul_atta_o8apf6.jpg",
                        description: `Amul Whole wheat Atta is made from whole wheat, selected carefully from the best of the fields and varieties. It is 100% whole wheat atta with a superior quality taste. The rotis made from this atta remains softer for a longer period. It is high in fibre and nutrients, a good source of protein, vitamins and minerals. It supports healthy digestion and overall health.`,
                        price: 190, details: { "Brand": "Amul", "Maximum Shelf Life (Months)": "3", "Country of Origin": "India","Is Perishable":"No","Organic":"No" }
                    },

                    {
                        name: "Aashirvaad Atta/Godihittu - Whole Wheat, 5 kg Pouch", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/ashirvad_atta_bkjr1a.png",
                        description: "Aashirvaad Whole Wheat Atta provides the goodness of health in every bite. This product incorporates many benefits of wheat and lets your body maintain a nutrient balance. It is made of nutritious wheat grains. Also, it has a sweet taste that gives you fuller and softer rotis, every single time. Buy Aashirvaad Whole Wheat Atta online now.",
                        price: 270, details: { "Brand": "Aashirvaad", "Manufacturer": "ITC Limited", "Country of Origin": "India", "Food Preference": "Vegetarian" }
                    }
                ]
            },

            {
                name: "Edible Oils", items: [
                    {
                        name: "Dhara Kachi Ghani Mustard Oil: 1 Litre", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/dhara_mustard_oil_ped8vc.jpg",
                        description: "Dhara Kachi Ghani Mustard Oil known for its sharp taste and aroma (Jhanjh) is a good source of monounsaturated fatty acid with Natural Omega-3 (or Alfa Linolenic Acid). Omega-3 is one of the Essential Fatty Acids (EFA) which cannot be synthesized by the human body, and must therefore be consumed from external sources. Dhara Kachi Ghani Mustard Oil also contains lowest saturated fatty acid amongst all edible oils. It comes with the unique Low Absorb Technology and Vitamin A & D2.",
                        price: 180, details: {"Brand":"Dhara","Type":"Mustard Oil","Maximum Shelf Life":"9 Months","Added Preservatives":"No", "Country of Origin": "India"}
                    },

                    {
                        name: "Fortune Refined Soyabean Oil Pouch  (1 L)", image: "https://res.cloudinary.com/ash006/image/upload/v1628168556/fortune_soyabeen_oil_yoz9se.jpg",
                        description: "Fortune soya health is certified as India's No. 1 cooking oil brand. The safe and pure Fortune Soya Health oil is processed with the next generation High Absorbent Refining Technology (H.A.R.T.) along with the richness of Omega 3. It is fortified with Vitamin A & Vitamin D which helps bosting immunity. Fortune Soya Health Oil contains PUFA, which helps in reducing cholesterol levels. Your everyday meals prepared with Fortune soya health oil not only tastes better, but also make your bones stronger and heart healthier.",
                        price: 150, details: { "Brand": "Fortune", "Country of Origin": "India", "Form": "Powder","Type":"Soyabean Oil","Maximum Shelf Life" :"9 Months", "Food Preference":"Vegetarian", "Added Preservatives":"No"}
                    }
                ]
            }
        ]
    }

]

const Items = (state, action) => {
    state = state || initialState

    return state
}

export default Items