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
Our goal was to visualize the Project Starts of the GEPRIS-Dataset per state in direct comparison with the outcoming patents per 
state.

## 2. Project description

### 2.1 Design decisions

#### a. Domain problem characterization
Our Main group of target users of the GEPRIS dataset consists of students, researchers, and scientifically interested people.
They would have questions about the proportion of research projects per state and the subject areas to which these belong. We extended this target group to investors and people with a financial background by adding patent's data to the dashboard. This part of the target group might have questions such as "Which states produces the highest
number of patents in comparison to the number of research projects started?".

#### b. Data / task abstraction

b1. We merged the GEPRIS-Data of the following CSV-Files to be able to relate projects to their institutions and subject areas.
  * extracted_project_data.csv
  * institution_ids_and_names.csv
  * project_ids_to_subject_areas.csv
  
b2. To get the name of the states we downloaded a geographic dataset from the geonames database. Afterwards, some preprocessing steps were necessary to matched the institution to their respective state. First we split the address field into three fields (street, postal code, and country). Once the postal code in the GEPRIS dataset became a single column, it was matched to the state in the new dataset.

b3. We downloaded the CSV-File "Patentsanmeldungen nach Bundesländern" from https://www.dpma.de/dpma/veroeffentlichungen/statistiken/csv-statistiken/index.html and joined it with our GEPRIS-Data.

b4. We filtered our entire CSV-File by the year starting from the year 2000 to the year 2018 because of the patents data from the 
Trademark Registry only covered this timeframe.

b5. We transformed the resulting CSV-File to a JSON-File to be able to follow our tutorial on Udemy which chose to explain the visualization process mainly with JSON-Files. We only kept the relevant information in the file concerning Bundesländer, "Projectstarts", patents and the Year.

b6. To standardize the names of the subject areas across all projects we scrapped the catalog of the DFG website (https://gepris.dfg.de/) and matched our dataset with it. Having this new data we created an aggregation containing the number of subject areas per state that were included in the "Projectstarts".
  
#### c. Visual encoding / interaction design
We decided to use a simple and clear structured All-in-One Dashboard-Design with multiple interlinked data views such as:
 * Dropdown menu containing the selected state. By selecting a state of interest with a left mouseclick the user can easily decide on a geographical category of interest, followed by the visualization in all interconnected Dataviews.
 
 * Dropdown menu containing either the number of "Projectstarts" or the number of Patents of the selected state. By selecting either
 the "Projectstarts" or the number of patents with a left mouseclick users can decide if they either want to display projects or patents in the line chart view.
 
 * Timeslider containing a timeframe from the year 2000 to 2018. By dragging the time slider with a holding left mouseclick followed by releasing the left mouse button the user can filter for a certain timeframe of interest in the line chart view.
 
 * Time-Navigation-Bar containing an area chart of the line chart view data. This dataview provides the possibility to navigate a previously filtered timeframe of the timeslider alongside the X-axis and, therefore, supporting the preferred Timefilter-Selection. The user can also draw a rectangle of an individual timeframe of interest to control the start and finishing point of the Timeslider functionality. With both Tools, the Timeslider and the Time-Navigation-Bar the user has a high amount of control to select individual timeframes of interest inspecting the line chart data.
 
 * Donutchart of the Projects-Share in 2000-2018 containing the relative share of each state in the entire timeframe from the year 2000 to 2018 considering the amount of "Projectstarts". This gives the user a better understanding of the relevance of a state related to the number of "Projectstarts". The donut chart updates in interaction with each selection in the state Dropdown-Menue and supports the user by coloring each Bundesland-Share in the same color as each Line chart-Curve-Color, therefore reducing the number of different colors displayed on the entire dashboard.
 
 * Donutchart of the Patents-Share in 2000-2018 containing the relative share of each state in the entire timeframe of the year 2000 to the year 2018 considering the number of patents. This gives the user a better understanding of the relevance of a state related to the number of patents registered. The donut chart updates in interaction with each selection in the state Dropdown-Menue and supports the user by coloring each Bundesland-Share in the same color as each line chart-Curve-Color, therefore reducing the number of different colors displayed on the entire dashboard.
 
 * Projects by subject area/state visualization containing the subject areas of each state related to the number of projectsstarts. This gives the user a better understanding of the type of "Projectstarts" considering strongly and weakly represented subject areas. Regrettably, this data is only present related to the number of "Projectstarts" of each state since the Trademark Registry Statistics did not contain any information about subject areas.
 
#### d. Algorithm design:
* We tried to reduce the complexity of our solution starting with limited focus from the beginning only on a certain aspect of the GEPRIS-Data since we are only considering information about each state, the number of "Projectstarts", the subject areas of the "Projectstarts", the number of Patents and the Year concerning each Data Entry. Also, the limited timeframe from 2000 to 2018 plays an advantage here.

* In the next phase we reduced the Dashboard-Complexity to only a certain amount of dataviews which we considered as necessary and benefiting for the user.

* The computational complexity is reduced by using only one main HTML-File for the visual representation and one main JavaScript-File to manipulate the biggest part to the represented data.

* For better overview in computational design we used separate JavaScript-Files for each Dataview-Type followed by their instantiation in the main JavaScript-File.


### 2.2 Validation of our design and lessons learned

* The bottleneck in our sisualization consists of mainly two design aspects:

  * Since we are including all 16 states in our dashboard our donutcharts contain all 16 elements. This confronts the user with a high amount of differently colored elements in chart. In this case, we explicitly decided to break the rule of the lecture of only coloring 5 to 6 elements in a visualization differently because we wanted to stick to our overall design decision to visualize all 16 states in our Dashboard-Design. Also, the very tiny share slices of states with a less amount of projects and or patents is a weakness in this visualization since the user can barely see the selected donut slice. We also stuck to this design decision since we wanted to give an overall view of the dataset and present a general picture of each state.

  * Also, the projects by subject area/state visualization shows small differently colored boxes, each box representing a project unit and the color clustering the subject area to which these projects belong to. The visualization can overwhelm the user in its complexity, however we here stuck to this design decision because of our claim to show as much information as possible on as little screen space as possible. The programming language to develop the project was a limitation in the selection of some of the types of charts as some ideas could not be taken to code as desired instead, some code examples with which was counted were adapted. In an evaluation of these projects, we would probably choose different chart types for the mentioned visualization weaknesses above.

* Overall we do not see our project weaknesses in the computational complexity since we have a limited focus but more in design decisions.

* Another general weakness in our argumentation chain in the fact that we are comparing the number of projectstarts to the number of registered patents, which leads to the question if choosing projecstarts is suitable. We explicitly decided to use this data because it was the most appealing information that we had in the GEPRIS-Dataset for our project objectives.

* Another general weakness is the fact that we are not able to show the subject areas of the number of patents registered in each state. Regrettably, the German Patents Statistic does not provide us with any information in this aspect. Also, the general train of thought of comparing the number of "Projectstarts" to the number of patents as a measure of efficiency and value is questionable. The goal doing this was mainly on achieving more visualization experience during the process instead of delivering a waterproof argumentation of the represented data.

### 2.3 Think aloud protocol / Threats and Validations to Munzner's Nested Model to Visualization Design

* Threat: Wrong problem

* Validate: Observe and interview target users. Observe adoption rates.

  * The project was introduced to a potential target user. The user understands the main purpose of the visualization immediately and is curious about discovering and interacting with the user interface.

* Threat: Wrong task/data abstraction 

* Validation: Test on target users, collect anecdotal evidence of utility. Field study, document human usage of deployed system.

  * The user interacts with the tool and to start she focuses on the line chart and explores different results by making use of the list box selecting different states and at the same time notices the ratio of projects is shown by the side. Then the user is curious about the patents and subject areas and plays around with the time slider to check results for different selections. 

* Threat: Ineffective encoding / interaction idiom

* Validation: Justify encoding / interaction design. Qualitative/quantitative result image analysis. Test on any users, informal usability study. Lab study, measure human time / errors for task.

  * During the interaction with the tool the user understands the interlinked behavior of the entire Dashboard and explores different state/year selections focusing especially on the number of patents by state. The user gets also interested in the subject area with the highest number of projects and looks for the results for some states. The user can interpret the data abstraction correctly according to the purpose.

* Threat: Slow algorithm 

* Validation: Analyze computational complexity. Measure system time / memory

  * We did not focus on this aspect since our dataset is limited and does not stress our system at all. 

### 2.4 Installation

* Open Github-Pages-Link https://flow85.github.io/github.io/ to view the project or use the following steps for a local installation:

* Install the newest python version from https://www.python.org/downloads/ and make sure to check the "add python.exe to PATH" checkbox in the installation dialog

* Install D3 in terminal/command line with "pip install d3" or "npm install d3"

* Download the Github-Repository of the Project from https://github.com/flow85/Data-Visualization-WS1920--Presentation-03 into your root directory

* Start your local python server with "python -m http.server"

* Open your browser and type "localhost:8000"

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

[GEPRIS Screencast](https://streamable.com/zlnns)

### 2.6 Contributors

* Adriana Pinto, https://github.com/adrianapintod

* Florian Mercks, https://github.com/flow85

### 2.7 Data copyright

* Data derived from original data provided by https://gepris.dfg.de (c) "Deutsche Forschungsgemeinschaft”

* Data derived from original data provided by https://www.dpma.de/dpma/veroeffentlichungen/statistiken/csv-statistiken/index.html (c) "Deutsches Patent- und Markenamt”

* Code derived from original Code source provides by https://www.udemy.com/course/masteringd3js (c) "Udemy.com - Mastering data visualization in D3.js"
