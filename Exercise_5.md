---
layout: module
exercise: Exercise 5
title: Creating a "Similar Properties" Lightning Component
---

### Objectives

In this exercise you will learn how to: 
* Retrieve and display data in Lightning Components
* Use System Events to navigate to a record and edit a record "in place"
* Create Design Parameters for use in App Builder

### Step 1 - Creating the Apex Class Controller

1. In the Developer Console, choose **File > New > Apex Class**. Name the class **MyPropertyController**. Click **OK**.

1. Delete the default implementation of the class and replace it with:

	```java
    public with sharing class MyPropertyController {

        @AuraEnabled
        public static List<Property__c> getSimilarProperties (Id recordId, String searchCriteria) {
            Property__c selectedProperty = [SELECT Price__c, Beds__c FROM Property__c WHERE Id=:recordId];
            if (searchCriteria == 'Bedrooms') {
                Decimal beds = selectedProperty.Beds__c;
                return [
                    SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c 
                    FROM Property__c WHERE Id != :recordId AND Beds__c = :beds
                ];
            } else {
                Decimal price = selectedProperty.Price__c;
                return [
                    SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c 
                    FROM Property__c WHERE Id != :recordId AND Price__c > :price - 100000 AND Price__c < :price + 100000
                ];
            }
        }
	    
    }
	```

1. Save the file. 

### Step 2 - Creating the Similar Properties Component

1. In the Developer Console, select **File > New > Lightning Component**.

1. Specify **SimilarProperties** as the component name, and check the **Lightning Record Page** checkbox. Click OK.

1. Add `controller="MyPropertyController"` to the `<aura:component>` tag.

1. Copy the following code into your new component inside the `<aura:component>` tag:

	```html
    <aura:attribute name="recordId" type="Id" />
    <aura:attribute name="similarProperties" type="Object[]" />
    
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    
    <lightning:card iconName="custom:custom85" title="Similar Properties">
        <div class="slds-p-left--medium slds-p-right--medium">
            <ul class="slds-list--vertical slds-has-dividers--top-space">
                <aura:iteration items="{!v.similarProperties}" var="item" indexVar="i">
                    <li class="slds-list__item">                   
                        {!item.Name}
                    </li>
                </aura:iteration>
            </ul>
        </div>
    </lightning:card>
	```
		
1. Click **CONTROLLER** in the right side bar of the code editor.

1. Replace the default implementation of the controller with the following code:

	```js
	({
		doInit : function(component, event, helper) {
	        var recordId = component.get("v.recordId");
	        var action = component.get("c.getSimilarProperties");
	        action.setParams({
	            recordId: recordId
	        });
	        action.setCallback(this, function(response){
	            var similarProperties = response.getReturnValue();
	            component.set("v.similarProperties", similarProperties);
	        });
	        $A.enqueueAction(action);
	    }
	})
	```

1. Save the file.

1. Go back to a Property Record Detail page, click the Setup icon and click **Edit Page**.

1. Locate the **SimilarProperties** component under **Custom Components** and drag it onto the page at the top of the right-hand column.

1. Click **Save** and then click the **Back** button: The page should now display similar properties (a list of properties in the same price range).

### Step 3 - Improving the User Interface

1. In the Developer Console, go back to the SimilarProperties component. Replace `{!item.Name}` inside the `<li>` with:

	```html
	<div class="slds-media">
	    <div class="slds-media__figure">
	        <img src="{!item.Thumbnail__c}" class="slds-avatar--large slds-avatar--circle" alt="{!item.Title_c}" />
	    </div>
	    <div class="slds-media__body">
	        <div class="slds-grid" >
	            <a data-record="{!item.Id}" onclick="{!c.navToRecord}">
	                <h3 class="slds-text-heading--small slds-m-bottom--xx-small">{!item.Name}</h3>
	            </a>
	            <!-- Edit button comes here -->                             
	        </div>
	        <div class="slds-m-top--small">
	            <ul class="slds-grid slds-wrap">
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Beds:</span> {!item.Beds__c}</li>
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Baths:</span> {!item.Baths__c}</li>
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Price:</span> {!item.Price__c}</li>
	                <li class="slds-list__item slds-size--1-of-2"><span class="slds-text-color--weak slds-m-right--small">Status:</span> {!item.Status__c}</li>
	            </ul>                                
	        </div>
	    </div>
	</div>
	```
		
1. Save the file.

1. Go back to the Property Record Detail page and refresh it.

### Step 4 - Navigating to a Similar Property

1. Go back to the Developer Console and open the controller of the SimilarProperties component.

1. Add the following function (don't forget to add a comma to seperate the function definitions):

	```js
    navToRecord : function (component, event, helper) {
	    var selectedItem = event.currentTarget;
	    var recordId = selectedItem.dataset.record;
	    var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
	        "recordId": recordId
	    });
	    navEvt.fire();
    }	
	```

1. Save the file.

1. Go back to the Property Record Detail page and refresh it. In the Similar Properties component, click the name of a property to navigate to that property detail page. 

### Step 5 - Editing a Similar Property "In Place"

1. In the Developer Console, go back to the SimilarProperties component markup.

1. Replace `<!-- Edit button comes here -->` with the following code:

	```html
	<lightning:buttonIcon iconName="utility:edit" class="slds-col--bump-left" variant="bare" alternativeText="Edit Record" onclick="{!c.editRecord}" value="{!item.Id}" />
	```
	
1. Save the file.

1. Click **CONTROLLER** in the side bar and add the following function (again, remember the comma to separate the functions):

	```js
	editRecord : function(component, event, helper) {
        var recordId = event.getSource().get("v.value");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recordId,
            searchCriteria: 'Price'
        });
        editRecordEvent.fire(); 
    }
	```
	
1. Save the file.

1. Go back to the Property Record Detail page and refresh it. In the Similar Properties component, click the edit icon for a property to edit that property in place. 

### Step 6 - Adding Design Parameters

1. On the Property Record Detail page, click the Setup icon and select **Edit Page**.

1. Remove the **SimilarProperties** component and save the page.

1. Switch back to the Developer Console and add a new line after **line 3** of the **SimilarProperties.cmp** file.

1. Paste the following on the new line:

	```html
	<aura:attribute name="searchCriteria" type="String" default="Price" />
	```
	
1. Change the **title** attribute of the `<lightning:card>` to `title="{! 'Similar Properties by ' + v.searchCriteria}"`.

1. Save the file.

1. Click **CONTROLLER** on the right-hand side of the window.

1. Modify the call to `action.setParams()` as follows to pass the value of the searchCriteria attribute:

    ```js
    action.setParams({
        recordId: recordId,
        searchCriteria: component.get("v.searchCriteria")
    });
    ```

1. Save the file.

1. Click **DESIGN** on the right-hand side of the window.

1. Replace the contents of the file with:

	```xml
	<design:component label="Similar Properties">
		<sfdc:objects>
		    <sfdc:object>Property__c</sfdc:object>
		</sfdc:objects>
		<design:attribute name="searchCriteria" label="Search By" datasource="Bedrooms, Price" default="Price" description="Search for similar houses based on what criteria?" />
	</design:component>
	```

1. Save the file.

1. On the **Property Record Detail page**, click the **Setup icon** and choose **Edit page**.

1. Under **Custom Components**, notice that the name of the component is now **Similar Properties** (with a space): this is the label from the design file.

1. Drag the component back into the right-hand column.

1. Notice the right-hand column now contains design parameters for the search criteria.

1. Switch the search criteria to **Bedrooms**.

1. Click **Save**, then navigate back to the Property Record Detail page.

> **Not working as expected?** The final implementation of the component is available [here](http://). Feel free to check it out or cut and paste it in your own component.


<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Exercise_4.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Exercise_5b.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>