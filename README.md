# CASPIR Visual Report Web Generator 
### Overview 
The purpose of the website is to analyze the participants' data and render the results after calculation. It provides graphs and tables which can help the researchers to understand the drinking pattern of the participants better and faster. The researcher not only can upload the CSV files for analysis but also can enter input to be rendered in the report such as the participant's information. 

The CSV files it intakes are TDS (Typical Drinking Situation) and All Morning surveys generated from RedCap. Chart One displays the total drinking per day during the whole study period. Chart two displays the average drinking of each TDS during the latest 30 days period of the study period. `TDS summary information` table renders the results based on TDS CSV file while the `Past month drinking` and `Overview of High Risk Situations over past month` section are based on the last 30 days entries of All Morning CSV file data. 

#### In General 
The web is built using `HTML`, `CSS`, and `JavaScript` but also with JS libraries such as `Bootstrap`, `Chartist`, `MatchMedia` and `Moment`. Please see `javascript/script.js` and `stylesheets/style.css` for detailed explanation. 
 

_For more information please email caspir@northwell.edu_


