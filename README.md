# GEPRIS-Patents-Dashboard

## Table of contents
* [1. Short description](#1-short-description)
* [2. Project description](#2-project-description)
    + [2.1 Design decisions](#21-design-decisions)
    + [2.2 Validation of our design and lessons learned](#22-validation-of-our-design-and-lessons-learned)
    + [2.3 Think aloud protocol](#23-think-aloud-protocol)
    + [2.4 Installation](#24-installation)
    + [2.5 Manual](#25-manual)
    + [2.6 Contributors](#26-contributors)
    + [2.7 Data copyright](#27-data-copyright)

## 1. Short description
Our goal was to visualize the Project Starts of the GEPRIS-Dataset per Bundesland in direct comparison with the outcoming patents per 
Bundesland.

## 2. Project description

### 2.1 Design decisions

#### a. Domain problem characterization
Our Main group of target users of the GEPRIS dataset consists of Students, Researchers, and scientifically interested people.
They would have questions about the proportion of research projects per Bundesland and the subject areas to which these belong. We extended this target group to investors and people with a financial background by adding patent's data to the dashboard. This part of the target group might have questions such as "Which Bundesland produces the highest
number of patents in comparison to the number of research projects started?".

#### b. Data / task abstraction

b1. We merged the GEPRIS-Data of the following CSV-Files to be able to relate projects to their institutions and subject areas.
  * extracted_project_data.csv
  * institution_ids_and_names.csv
  * project_ids_to_subject_areas.csv
  
b2. To get the name of the states we downloaded a geographic dataset from the geonames database. Afterwards, some preprocessing steps were necessary to matched the institution to their respective state. First we split the address field into three fields (street, postal code, and country). Once the postal code in the GEPRIS dataset became a single column, it was matched to the state in the new dataset.

b3. We downloaded the CSV-File "Patentsanmeldungen nach Bundesländern" from https://www.dpma.de/dpma/veroeffentlichungen/statistiken/csv-statistiken/index.html and joined it with our GEPRIS-Data.

b4. We filtered our entire CSV-File by the year starting from the year 2000 to the year 2018 because of the Patents data from the 
Trademark Registry only covered this timeframe.

b5. We transformed the resulting CSV-File to a JSON-File to be able to follow our Tutorial on Udemy which chose to explain the visualization process mainly with JSON-Files. We only kept the relevant Information in the file concerning Bundesländer, Projectstarts, Patents and the Year.

b6. To standardize the names of the subject areas across all projects we scrapped the catalog of the DFG website (https://gepris.dfg.de/) and matched our dataset with it. Having this new data we created an aggregation containing the number of subject areas per Bundesland that were included in the Projectstarts.
  
#### c. Visual encoding / interaction design
We decided to use a simple and clear structured All-in-One Dashboard-Design with multiple interlinked data views such as:
 * Dropdown menu containing the selected Bundesland. By selecting a Bundesland of interest with a left mouseclick the user can easily decide on a geographical category of interest, followed by the visualization in all interconnected Dataviews.
 area of interest and
 
 * Dropdown menu containing either the number of Projectstarts or the number of Patents of the selected Bundesland. By selecting either
 the Projectstarts or the number of Patents with a left mouseclick the user can decide if he or she either wants to display Projects or Patents in the Line chart view.
 
 * Timeslider containing our timeframe from the year 2000 to the year 2018. By trimming the time slider with a holding left mouseclick followed by releasing the left mouse button the user can filter for a certain timeframe of interest in the line chart view.
 
 * Time-Navigation-Bar containing an area chart of the Line chart view Data. This Dataview provides the possibility to navigate a previously filtered Timeframe of the Timeslider alongside the X-Axis and, therefore, supporting the preferred Timefilter-Selection. The user can also draw a rectangle of an individual timeframe of interest to control the start and finishing point of the Timeslider functionality. With both Tools, the Timeslider and the Time-Navigation-Bar the user has a high amount of control to select individual timeframes of interest inspecting the Line chart data.
 
 * Donutchart of the Projects-Share in 2000-2018 containing the relative share of each Bundesland in the entire Timeframe of the year 2000 to the year 2018 considering the amount of Projectstarts. This gives the user a better understanding of the relevance of a Bundesland related to the number of Projectstarts. The Donut chart updates in interaction with each selection in the Bundesland Dropdown-Menue and supports the User by Coloring each Bundesland-Share in the same Color as each Line chart-Curve-Color, therefore reducing the number of different colors displayed on the entire Dashboard.
 
 * Donutchart of the Patents-Share in 2000-2018 containing the relative share of each Bundesland in the entire Timeframe of the year 2000 to the year 2018 considering the number of Patents. This gives the user a better understanding of the relevance of a Bundesland related to the number of Patents registered. The Donut chart updates in interaction with each selection in the Bundesland Dropdown-Menue and supports the User by Coloring each Bundesland-Share in the same Color as each Line chart-Curve-Color, therefore reducing the number of different colors displayed on the entire Dashboard.
 
 * Projects by subject area / state visualization containing the subject areas of each Bundesland related to the number of projectsstarts. This gives the user a better understanding of the type of Projectstarts considering strongly and weakly represented subject areas. Regrettably, this data is only present related to the number of Projectstarts of each Bundesland since the Trademark Registry Statistics did not contain any information about subject areas.
 
#### d. Algorithm design:
* We tried to reduce the complexity of our solution starting with limited focus from the beginning only on a certain aspect of the GEPRIS-Data since we are only considering information about each Bundesland, the number of Projectstarts, the subject areas of the Projectstarts, the number of Patents and the Year concerning each Data Entry. Also, the limited Timefrage from the Year 2000 to 2018 plays an advantage here.

* In the next phase we reduced the Dashboard-Complexity to only a certain amount of Dataviews which we considered as necessary and benefiting for the User.

* The computational complexity is reduced by using only one main HTML-File for the visual representation and one main JavaScript-File to manipulate the biggest part to the represented data.

* For better Overview in computational design we used separate JavaScript-Files for each Dataview-Type followed by their instantiation in the main JavaScript-File.


### 2.2 Validation of our design and lessons learned

* The Bottleneck in our Visualization consists of mainly two design aspects:

  * Since we are including all 16 Bundesländer in our Dashboard our Donutcharts contain all 16 Elements. This confronts the user with a high amount of differently colored Elements in Chart. In this case, we explicitly decided to break the rule of the lecture of only coloring 5 to 6 Elements in a visualization differently because we wanted to stick to our overall design decision to visualize all 16 Bundesländer in our Dashboard-Design. Also, the very tiny share slices of Bundesländer with a less amount of projects and or patents is a weakness in this visualization since the user can almost not see the selected donut slice. We also stuck to this design decision since we wanted to give an overall view of the dataset and present a general picture of each Bundesland.

  * Also the Projects by subject area / state visualization shows an amount of differently colored elements in the form of subject areas that can overwhelm the user in its complexity. We also here stuck to this design decision because of our claim to show as much information as possible on as little screen space as possible. In an evaluation of these projects, we would probably choose different chart types for the mentioned visualization weaknesses above.

* Overall we do not see our project weaknesses in the computational complexity since we have a limited focus but more in design decisions.

* Another general weakness in our argumentation chain in the fact that we are comparing the number of projectstarts to the number of registered Patents, which leads to the question if choosing projecstarts is suitable. We explicitly decided to use this data because it was the most appealing information that we had contained in the GEPRIS-Dataset for our project objectives.

* Another general weakness is the fact that we are not able to show the subject areas of the number of Patents registered in each Bundesland. Regrettably, the German Patents Statistic does not provide us with any information in this aspect. Also, the general train of thought of comparing the number of Projectstarts to the number of Patents as a measure of efficiency and value is questionable. The Goal doing this was mainly on achieving more visualization experience during the process instead of delivering a waterproof argumentation of the represented data.

### 2.3 Think aloud protocol / Threats and Validations to Munzner's Nested Model to Visualization Design

* Threat: Wrong problem

* Validate: Observe and interview target users. Observe adoption rates.

  * I introduce the main purpose about insights about research projectstarts and outcoming patents to my mother. She understands the problem immediately and is curious about discovering the user interface.

* Threat: Wrong task/data abstraction 

* Validate: Test on target users, collect anecdotal evidence of utility. Fiels study, document human usage of deployed system.

  * I explain our choice to only concentrate on the number of projects and patents to make a focused comparison on these two ratios. I also explain that we wanted to show the subject areas which belong to these projectsstarts. By mentioning the fact that we also want to compare Bundesländer my mother gets the entire picture of our data abstraction and is completely briefed for the next steps.

* Threat: Ineffective encoding / interaction idiom

* Validate: Justify encoding / interaction design. Qualitative / quantitative result image analysis. Test on any users, informal usability study. Lab study, measure human time / errors for task.

  * I start to explain the usage of the different visualizations and show the interlinked behaviours of the entire Dashboard to my mother. She begins to pick up the usability workflow and starts to explore the surface, browsing through different Bundesländer, especially interested in their number of patents. Her eyes follow the Linecharts and switch to the Donutdiagrams of each Bundesland. She is astouned by the efficiency of Bundesländer such as Baden Württemberg and Bayern. She mentions how little research effort they have to put in to achieve such a high output of patents. She is also irritated about the low numbers of Berlin. She mentions that she thought that Berlin would have had way higher numbers of patents. She is also interested in the amount of projectstarts that consist of the subject area medicine. I realise that she is interested more in general ratios of Bundesländer comparisons than in the exact Linechart curve along the timeline.

* Threat: Slow algorithm 

* Validate: Analyze computational complexity. Measure system time / memory

  * We did not focus on this aspect since our dataset is limited and does not stress our system at all. 

### 2.4 Installation

* Open Github-Pages-Link https://flow85.github.io/github.io/ to view the project or use the following steps for a local installation:

* Install the newest python version from https://www.python.org/downloads/ and make sure to check the "add python.exe to PATH" checkbox in the installation dialog

* Install D3 in terminal/command line with "pip install d3" or "npm install d3"

* Download the Github-Repository of the Project from https://github.com/flow85/Data-Visualization-WS1920--Presentation-03 into your root directory

* Start your local python server with "python -m http.server"

* Open your browser with "localhost:8000"

* Now you should be able to use the visualization

### 2.5 Manual

This Screenshot shows an Overview of our GEPRIS-Patents-Dashboard for the selected Bundesland Berlin.
With the Timeslider you are able to manipulate the visualized Timeframe of the Data.
With the Bundesland Dropdown menu on the right, you can select a Bundesland of interest.
With the #Projectstarts/#Patents Dropdown menu, you can choose the Line chart to switch
between Projectstarts- or Patents-Data.
You can see a Line chart of the Projectstarts in Berlin beginning from the Year 2000 to 2018.
Under the Line chart you can manipulate a previously selected Timeframe in the form of a grey Box
alongside the X-Axis to have more control over your visualized Timeframe.
One the right from the Line chart we see two Donutcharts. The upper Donutchart shows the relative
share of Projectstarts of the selected Bundesland Berlin in the Timeframe 2000-2018. 
The second Donutchart below shows the relative Patentshare of the selected Bundesland Berlin in
the Timeframe 2000-2018.
The Projects by subject area / state visualization below the dashboard shows the number of projects for the selected state.
This information is only available for Projectstarts and not for Patents.

[gepris_dashboard_overview](https://1drv.ms/u/s!ArGZv4DiebZJkyhVd7svLqoHJbUZ?e=niIr9c)

[GEPRIS Screencast](https://streamable.com/iqlco)

### 2.6 Contributors

* Adriana Printo, https://github.com/adrianapintod

* Florian Mercks, https://github.com/flow85

### 2.7 Data copyright

* Data derived from original data provided by https://gepris.dfg.de (c) "Deutsche Forschungsgemeinschaft”

* Data derived from original data provided by https://www.dpma.de/dpma/veroeffentlichungen/statistiken/csv-statistiken/index.html (c) "Deutsches Patent- und Markenamt”

* Code derived from original Code source provides by https://www.udemy.com/course/masteringd3js (c) "Udemy.com - Mastering data visualization in D3.js"
