---
title:  "How to create a custom workflow activity"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-a-custom-workflow-activity.md'
category: Tutorials
version: v6.0
tags: [workflow, activity, sn6, sn7, backend]
---

# How to create a custom workflow activity
The [Workflow component](https://github.com/SenseNet/sn-workflow) in sensenet ECM contains many predefined activities (see the main [Workflow](/docs/workflow) article for examples), but the framework is extendible.

Developers can create their own custom activities that perform a task specific for the business process - for example communicating with another system or make custom database updates.

## Creating the activity class
An activity is basically a .Net class inherited from one of the built-in ASP.NET or sensenet ECM activities. In most cases you will inherit from *CodeActivity* or *NativeActivity*.

> For the differences see [this article](http://dotnetrobert.com/node/47).

Activities should be **small and focus on one thing** (e.g. creating a content or sending a mail). The reason behind this is to make the workflow robust and scalable: the engine executes an activity, than persists (serializes) all the necessary information to its db. If executing an activity takes too long, it uses too much resources that might be needed by other threads and activities.

```csharp
public sealed class ApproveContent : CodeActivity
{
    // Define an activity input argument of type string
    public InArgument<string> ContentPath { get; set; }

    // If your activity returns a value, derive from CodeActivity<TResult>
    // and return the value from the Execute method.
    protected override void Execute(CodeActivityContext context)
    {
        // Obtain the runtime value of the ContentPath input argument
        var contentItem = Node.Load<GenericContent>(ContentPath.Get(context));

        // prevent the workflow engine from aborting the workflow because the related content changed
        using (InstanceManager.CreateRelatedContentProtector(contentItem, context))
        {
            contentItem.Approve();
        }
    }
}
```

#### Display activities in Toolbox
Custom activities can be displayed on the Toolbox panel and used the same way as the built-in activities. If you create an activity in your solution, it should appear *automatically* on the Toolbox. If the activity is in a different library you have to add it manually: right click anywhere on the Toolbox and select *Choose Items...*. On the opening window you can add your custom libraries and the activities in it.

![Add activity dll](/docs/img/workflow/workflow-add-activities.png "Add activity dll")

