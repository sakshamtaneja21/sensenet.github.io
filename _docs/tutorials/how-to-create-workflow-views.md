---
title:  "How to create workflow views"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-workflow-views.md'
category: Tutorials
version: v6.0
tags: [workflow, view, sn6, sn7, frontend]
---

# How to create workflow views
The [Workflow component](https://github.com/SenseNet/sn-workflow) in sensenet ECM gives you the possibility of defining your own [workflows](/docs/workflow). In this article you'll learn how to create workflow-related content views based on the [WebPages component](https://github.com/SenseNet/sn-webpages). We will create ASP.NET controls (ascx files) to support the initialization or startup of workflows.

The workflows in sensenet ECM are usually built around [content](/blog/2017/07/12/everything-is-a-content). Workflows usually start when something happens with a content, sometimes they create tasks for administrators and wait for them to complete those tasks. This means workflow views in sensenet ECM are almost exclusively **simple content views** displaying a content that are not much different from regular content views.

In this article we will use the **Approval workflow** as an example for creating the views.

## Initial view
In case of workflows that are *Assignable to content lists*, you have to create an initial view that is displayed to the *administrator* when she assigns the workflow to the content list.

> In case you are working with a workflow that will be executed outside of a content list, you **do not have to create an initial view**.

The initial content view should be named as **AssignWorkflow.ascx** and placed into the content view 
folder of the workflow type. In this case, the following folder:

```txt
/Root/Global/contentviews/ApprovalWorkflow
```

The initial view contains the fields that drive the approval process: first and second level approvers and time frames for approving the document. These fields will be filled by the list admin who assigns the workflow to the list (and not the users who start the workflow). 

```html
<%@ Language="C#" AutoEventWireup="true" Inherits="SenseNet.Portal.UI.SingleContentView" %>
<div class="sn-content sn-content-inlineview">
 
    <sn:GenericFieldControl runat="server" ID="GenericFieldcontrol1" FieldsOrder="DisplayName Description FirstLevelApprover FirstLevelTimeFrame SecondLevelApprover SecondLevelTimeFrame WaitForAll" />        
 
</div>
 
<asp:PlaceHolder ID="PlaceHolder1" runat="server"></asp:PlaceHolder>
 
<div class="sn-panel sn-buttons">
  <asp:Button class="sn-submit" ID="AssignWorkflow" runat="server" Text="Assign to list" />
  <sn:BackButton class="sn-submit" ID="Cancel" runat="server" Text="Cancel" />
</div>
```

> Note that the **id of the button** that assigns the workflow to the Content List should be **AssignWorkflow**. If this control is not present in the content view, the assign workflow portlet will not be able to connect the workflow to the list.

After you saved this content view, administrators will be able to assign the *Approval workflow* to a content list.

![Assign workflow](/docs/img/workflow-assign-to-list.png "Assign workflow")

## Start view
The Start view is displayed to the user when she starts the workflow. This content view is necessary for all types of workflows to function correctly. The name of this content view is **StartWorkflow.ascx** and it should be placed to the content view folder of the workflow type: 

```txt
/Root/Global/contentviews/ApprovalWorkflow/StartWorkflow.ascx
```

The start view for the *Approval workflow* does not contain any editable fields. It displays only the approver users and time frames the administrator chose when she assigned the workflow to this list. If there are any values that the user should fill at this point (for example comments for the approver), thse fields should be placed into this view in edit mode.

The following sample view contains some logic about calculating time frames but basically only displays the names of the approver users and the time frame they have.

```html
<%@ Language="C#" AutoEventWireup="true" Inherits="SenseNet.Portal.UI.SingleContentView" %>
<%@ Import Namespace="SenseNet.ContentRepository" %>
<%@ Import Namespace="SenseNet.ContentRepository.Storage" %>
 
<div class="sn-content sn-workflow sn-content-inlineview">
 
        <%
            var FirtsLevelApprover = this.Content["FirstLevelApprover"] as IEnumerable<Node>;
            string FirstLevelTimeFrame = String.Format("{0} hours", TimeSpan.Parse(this.Content["FirstLevelTimeFrame"].ToString()).TotalHours);
            var SecondLevelApprover = this.Content["SecondLevelApprover"] as IEnumerable<Node>;
            string SecondLevelTimeFrame = String.Format("{0} hours", TimeSpan.Parse(this.Content["SecondLevelTimeFrame"].ToString()).TotalHours);
        %>
 
        <h2 class="sn-content-title"><%= SenseNet.Portal.UI.IconHelper.RenderIconTag(this.Icon, null, 32) %>Start <strong><%= (this.Content.ContentHandler as GenericContent).DisplayName%></strong> on <strong><%= ((Node)this.Content["RelatedContent"]).DisplayName %></strong></h2> 
        <dl class="sn-content-lead">
        <% if (FirtsLevelApprover != null && FirtsLevelApprover.Count() > 0) { %> <dt>First level approver:</dt><dd><strong> <%= FirtsLevelApprover.FirstOrDefault().DisplayName %> </strong></dd><% } %>
        <% if (!String.IsNullOrEmpty(FirstLevelTimeFrame)) { %> <dt>First level time frame:</dt><dd><strong><%= FirstLevelTimeFrame %> </strong></dd><% } %>
        <% if (SecondLevelApprover != null && SecondLevelApprover.Count() > 0) { %>
        <dt>Second level approver(s):</dt><dd>
            <% foreach (var approver in SecondLevelApprover)
               { %> 
               <strong> <%= approver.DisplayName %> </strong> &nbsp;
            <% } %></dd> 
        <% } %>
        <% if (!String.IsNullOrEmpty(SecondLevelTimeFrame)) { %> <dt>Second level time frame:</dt><dd><strong> <%= SecondLevelTimeFrame %> </strong></dd><% } %>
        </dl>
 
</div>
<sn:ErrorView id="ERROR"  runat="server" />
<asp:PlaceHolder ID="PlaceHolder1" runat="server"></asp:PlaceHolder>
 
<div class="sn-panel sn-buttons">
  <asp:Button class="sn-submit" ID="StartWorkflow" runat="server" Text="START" />
</div>
```

> Note that the **id of the button** that starts the workflow should be **StartWorkflow**. If this control is not present in the content view, the start workflow portlet will not be able to start the workflow.

If you placed the content view to the place given above, the following page will be displayed to the users when they start the approval workflow on a document:

![Start approval](/docs/img/workflow-start-approval.png "Start approval")


