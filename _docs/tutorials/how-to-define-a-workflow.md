---
title:  "How to define a workflow"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-define-a-workflow.md'
category: Tutorials
version: v6.0
tags: [workflow, sn6, sn7, backend]
---

# How to define a workflow
The workflow functionality in sensenet ECM is built on [Windows Workflow Foundation 4](http://msdn.microsoft.com/en-us/netframework/aa663328), so the creation of a workflow always starts with the creation of a *Workflow Activity* in **Visual Studio**. It is essentially a **XAML file** that you will fill with the steps (activities like sending an email or approving a document) of the workflow and upload it to the content repository.

![Workflow designer](https://raw.githubusercontent.com/SenseNet/sn-workflow/master/docs/images/workflow-designer.png "Workflow designer")

## Activities
As a workflow can be considered a declarative program, its steps can be considered as statements. These are called *Activities* and can be as simple as sending a message but may perform more complex tasks too. Activities can contain other activities - this allows the builder to create a workflow structure that is easily understandable but able to achieve lots of different tasks.

### .Net activities
The Workflow Foundation has a *base activity library* with different types of activities, for example:

- **Assign**: assigns a value to a variable in the workflow
- **If**: creates a branch of execution
- **SendMessage**: sends a message via **WCF**
- **Sequence**: groups together a set of activities that are executed sequentially
- **ForEach**: executes an activity for each object in a collection
- **While**: executes a single activity as long as a condition as true
- **Pick**: waits for two or more events to happen. The first one to occur will determine the subsequent steps of the workflow.
- **Delay**: suspends the workflow for the given period of time. Often used in conjunction with one of the control flow activities like *Parallel* or *Pick*.

### sensenet-specific activities
sensenet ECM has a few built-in activities related to the Content Repository. These activities are usually about managing content items or waiting for them to change. For example:

- **Create Content**: creates a new content in the specified folder with the specified content type and initial field values.
- **Assign field value**: sets a single field value and saves the content.
- **Set permission**: Changes content permissions.
- **Wait for content change**: suspends the workflow until the specified content (e.g. a task or a document) changes. This requires an existing content in the Content Repository.
- **Wait for container change**: expects a container (e.g. a folder or document library) and suspends the workflow until somebody creates a new content or edits any of the existing ones inside that container. Usually this is about waiting for a user to upload a new document. As an output parameter you receive the new or changed child content and the information about the operation itself (whether this was a content creation, edition or deletion).
- **SendMail**: sends a mail through the regular .Net mail message API.

> Developers can create their own [custom activity](/docs/tutorials/how-to-create-a-custom-workflow-activity) that performs a task specific for the business process - for example communicating with another system or make custom database updates.

## Uploading the workflow definition
After you completed the workflow xaml file, you have to upload it to the Content Repository. Please navigate to the following folder in Content Explorer and upload the file:

```txt
/Root/System/Workflows
```

> If you did not install the [WebPages](https://github.com/SenseNet/sn-webpages) UI component, you can still work with workflows: you have to make the same modifications described in this article through the REST api of sensenet ECM - in this case uploading the workflow definition (for example using the [.Net client library](https://github.com/SenseNet/sn-client-dotnet)).

### Workflow definition properties
There are a couple of fields that you can set on the workflow definition content after uploading the xaml file. These are the following:

- **Content workflow**: True for workflow types that are related to one content (e.g. approval or printing). Related content must be an existing content.
- **Assignable to content list**: determines if this workflow can be assigned to a content list (e.g. to a document library).
- **Abort on related content change**: If set to true workflow will be automatically aborted whenever the related content changes (default is true).
- **Automatic deletion**: You may choose if and when the workflow content should be deleted after a workflow finished running. In most cases the default setting (delete when completed without errors) is sufficient. You may also choose to always delete or always keep the workflow content - e.g. for auditing reasons.

## Create a workflow Content Type
After the workflow definition is uploaded, you have to bind that to a new [Content Type](/docs/content-type) in sensenet ECM that you create for your workflow.

The binding is based on a naming convention: the **content type must have the same name as the workflow definition without the xaml file extension** (e.g. if you uploaded a workflow definition called *Sample.xaml* then the name of the content type which represents this workflow in the system must be *Sample*).

In addition to the naming convention, the newly created content type must be inherited from the base *Workflow* content type.

The content type definition of a *Sample* workflow should look like this:

```xml
<ContentType name="Sample" parentType="Workflow" handler="SenseNet.Workflow.WorkflowHandlerBase" xmlns="http://schemas.sensenet.com/SenseNet/ContentRepository/ContentTypeDefinition">
  <DisplayName>Sample Workflow</DisplayName>
  <Description>Sample Workflow</Description>
  <Icon>workflow</Icon>
  <Fields>
  </Fields>
</ContentType>
```

You should notice the following attributes in the example above:

- **parentType="Workflow"** the parent of your type must be the *Workflow* type or a derived type of that type.
* **handler="SenseNet.Workflow.WorkflowHandlerBase"** the [Content Handler](/docs/content-handler) of your type must be *SenseNet.Workflow.WorkflowHandlerBase* or a derived type of that type.

## Create content views for your workflow
If you have the *WebPages* component in sensenet ECM, you can create initial and start views for your workflow (depending on the usage scenario). Please visit the following article for details:

- [How to create workflow views](/docs/tutorials/how-to-create-workflow-views)