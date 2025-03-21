
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
    * Archive (Logical Erase) --
* Roster
    * Figures and tables
* Projects

One postgres database

## Tables

### Prospects Table

* Prospects(Really roster)
    * Int - ID
    * VarChar - Name
    * VarChar - Last Name
    * Varchar - Email(Can be NULL)
    * Varchar - route to resume(Will be URL to S3)(Can be NULL) --
    * Int - Phone(Can be NULL)
    * VarChar - Status
        * Active
        * Hired
        * Not in process
        * Discarted
        * Paused
        * Archived -- Added
    * VarChar - Seniority(Level)
        * Senior
        * Consultant
        * Analyst
        * Manager --
    * VarChar - Job Title(Expertise)
        * Front End Developer
        * Back End Developer
        * Full Stack Developer
    * ManyToMany - Capability
    * ManyToOne - Prospected For(Can be NULL) ---
    * VarChar - Crosstraining(?)(Can be NULL) -- Eliminate
    * ManyToOne - Project(Can be NULL)

### Capabilites Table

* Capabilites -- Absorbs Sub Capabilites
    * Int - ID
    * VarChar - Name
    * Varchar - Type
        * Main
        * Sub
    * ManyToMany - Prospects

### Project Table

* Project -- Absorbs Prospected For
    * Int - ID
    * VarChar - Name
    * company --
    * Start time --
    * deadline --
    * ManyToMany - projectcontacts
    * OneToMany - Prospects

### Project Contacts Table

* Project Contacts
    * id
    * name
    * phone

### Users Table

* Users
    * Varchar - username
    * Varchar - password
    * Varchar - Level
        * User - Can't create user
        * Admin - Can create user

### Roster

* VarChar - Status
    * Coming available
    * Assigned
    * Available
    * Not available
    * Hold
* ManyToMany - Prospected For(Can be NULL)
