# ManageU

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

## Introduction

This is a project written for UTS Capstone Subject: Systems Development Project.

### Team Composition

- Ziwei Tang – Project Leader
- [Wilson Yu](https://github.com/unmentioned) – Project Vice Leader
- [Limyandi Vicotrico](https://github.com/limyandi) – Technical Lead
- [Jayden Liang](https://github.com/squabbi) – Librarian
- Jacob Harris – Quality Assurance
- [Charlie Park](https://github.com/charllieee) – Documentation

### Background

The UTS Faculty of Engineering and Information Technology (FEIT) run various seminars
throughout the year. 
UTS currently uses: 
- Eventbrite and 
- Ungerboek to help people gain knowledge of these seminars. 

> Eventbrite is normally used for small events like workshops
where the main goal is to register attendees. On the other hand, Ungerboek is used for larger
events like conferences that run for several days, have hundreds of attendees, deal with
conference fees and many more. 

> While all of these full featured event management systems
are very helpful, they might be a little bit too complex when the FEIT staff want to run a simple
seminar. ManageU is an easy to use application which allows staff to create seminars quickly
and easily, resolving the inconveniences of the current system.

## User Interface Design

![image](https://user-images.githubusercontent.com/19499685/90324446-2ec22380-dfae-11ea-95d6-f85e5440d0a2.png)
![image](https://user-images.githubusercontent.com/19499685/90324444-2cf86000-dfae-11ea-90f9-df6916b52c6f.png)

## Software Architecture

The ManageU application is a Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite).

The Flux architecture is used for the application, which utilises a unidirectional data flow.

![image](https://user-images.githubusercontent.com/19499685/90324427-f3bff000-dfad-11ea-9765-ee8d925a4269.png)

### Class Diagram

![image](https://user-images.githubusercontent.com/19499685/90324429-f91d3a80-dfad-11ea-8b19-7f3475794a89.png)

### Solution Architecture

![image](https://user-images.githubusercontent.com/19499685/90324539-30d8b200-dfaf-11ea-8a32-b5cf845f2bd1.png)


![SolutionArchitecture](https://user-images.githubusercontent.com/19499685/90324365-0128aa80-dfad-11ea-9566-aac899acc2e7.png)

## Utility Tools

The Agile Methodology was used to build the application. With 7 weeks available to complete the project, the timeframe for each sprint is two week, with evaluation after each sprint finish. Trello has been utilised to keep track of story and story points.

![image](https://user-images.githubusercontent.com/19499685/90324398-962ba380-dfad-11ea-863c-bde473f48a76.png)

Each user story contains the following elements that will help the team be informed on the
project sprint schedule.

1. Priority (Values: Red, Yellow, Green)
This element signifies the priority of the user story using the high, medium and low rating
based on the colour of the element which are red, yellow and green respectively.
2. Completion Date and Status (Green, Grey)
This element displays the deadline for the user story to be implemented. Once completed,
the person responsible for this user story can change the element to green which shows that
this user story is complete.
3. Estimation (Values: 1 - 10)
This element displays the difficulty or complexity to implement the user story, this also
indicates how long it will take to implement where 1 is easy and quick while 10 is complex
and will take time to complete.
4. Assigned team member
This element indicates who is responsible for the marked user story. Depending on the
difficulty of the user story, multiple team members can be assigned to a single user story.
This allows division of work much more easily and improve clarity of which tasks are assigned
to whom.
