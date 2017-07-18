---
title:  "How to create a custom workflow activity"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-a-custom-workflow-activity.md'
category: Tutorials
version: v6.0
tags: [workflow, sn6, sn7, backend]
---

# How to create a custom workflow activity
The [Workflow component](https://github.com/SenseNet/sn-workflow) in sensenet ECM contains many predefined activities (see the main [Workflow](/docs/workflow) article for examples), but the framework is extendible.

Developers can create their own custom activity that performs a task specific for the business process - for example communicating with another system or make custom database updates.

#### Display activities in Toolbox
Custom activities can be displayed on the Toolbox panel and used the same way as the built-in activities. If you create an activity in your solution, it should appear *automatically* on the Toolbox. If the activity is in a different library you have to add it manually: right click anywhere on the Toolbox and select *Choose Items...*. On the opening window you can add your custom libraries and the activities in it.

![Add activity dll](/docs/img/workflow/workflow-add-activities.png "Add activity dll")

