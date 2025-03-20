
# Personal Dashboard

## Tasks

* DB Design
* API Definition
* Process Diagram
* BE Implementation
* FE Implementation

## Front

Sort reset button

* sort by name
* sort by capabilites
* sort by project
* sort by status

## API

### Prospects

* GET api/prospects/
* GET api/prospects/{ID}/
* PUT api/prospects/{ID}/
* POST api/prospects/
* DELETE api/prospects/{ID}/

### Capabilities

* PUT api/capabilities/{ID}/
* POST api/capabilities/
* DELETE api/capabilities/{ID}/

### Sub Capabilities

* PUT api/sub-capabilities/{ID}/
* POST api/sub-capabilities/
* DELETE api/sub-capabilities/{ID}/

### Project

* PUT api/project/{ID}/
* POST api/project/
* DELETE api/project/{ID}/

## Modules

* Hiring
	* Figures and tables
	* Add section to add Capabilites/Sub Capabilites/Prospected For
	* Archive (?)
* Roster
	* Figures and tables

## Prospects Table

One postgres database

* Prospects(Really roster)
	* Int - ID
	* VarChar - Name
	* VarChar - Last Name
	* Varchar - Email(Can be NULL)
	* Varchar - route to resume(?)(Can be NULL)
	* Int - Phone(Can be NULL)
	* VarChar - Status
		* Active
		* Hired
		* Not in process
		* Discarted
		* Paused
	* VarChar - Seniority(Level)
		* Senior
		* Consultant
		* Analyst
	* VarChar - Job Title(Expertise)
		* Front End Developer
		* Back End Developer
		* Full Stack Developer
	* ManyToMany - Capability
	* ManyToMany - Sub Capability(Otro Nombre)
	* ManyToMany - Prospected For(Can be NULL)
	* VarChar - Crosstraining(?)(Can be NULL)
	* ManyToOne - Project(?)(Can be NULL)
* Capabilites
	* Int - ID
	* VarChar - Name
* Sub Capabilites
	* Int - ID
	* VarChar - Name
* Prospected For
	* Int - ID
	* VarChar - Name
* Project
	* Int - ID
	* VarChar - Name

## Users Table

* Users
	* Varchar - username
	* Varchar - password
	* Varchar - Level
		* User - Can't create user
		* Admin - Can create user
