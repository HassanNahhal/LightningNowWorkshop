---
layout: module
exercise: Exercise 3
title: Using a Visualforce page in a Lightning Experience page
---

### Exercise Goals

* Modifying a Lightning Experience Record Home Page with App Builder
* Adding a Visualforce page to an existing Lightning Experience Record Home Page

### Step 1 - Make a Visualforce page available as a Lightning Component
1. Click the Setup menu and choose **Setup Home**.
2. In the Quick Find, type "visualforce".
3. Click **Visualforce Pages**.
4. Click the **Edit** action for your **SimilarProperties** page.
5. Check the box for **Available for Salesforce mobile apps and Lightning Pages**.
6. Click Save.

### Step 2 - Customize a Record Home page
1. Navigate back to a Property Detail page.
2. Click the Setup menu and choose **Edit page**.
3. Locate the **Visualforce** Lightning Component in the list of Standard Components in the Component List.
4. Drag the component onto the page and place it at the top of the right-hand column.
5. **SimilarProperties** should automatically be selected in the Visualforce pick list on the right-hand side of App Builder. If it is not, click the pick list to choose it.
6. In the Label field, type "Similar Properties" and press Tab.
7. Modify the Height field to be **250** and press Return.
8. Click the Save button.
9. Click the Activate button if this is the first time you've activated the page. Activate the page as the default for the org.
10. Click Save.
11. Click the Back button in the upper righthand corner of App Builder to return to the property page.
12. Notice that the Visualforce page is rather indented within the Card component.

### Step 3 - Modify the markup to match SLDS
1. Open the Dev Console, and choose **File > Open Resource**, then choose the **Similar_Properties.vfp** page.
2. Select the contents of the page and replace it with the [contents of this page](https://raw.githubusercontent.com/developerforce/LightningNowWorkshop/master/Exercise_3/src/pages/Similar_Properties.page).
3. Save the page, then reload the Property Record Detail page.
4. (Optional) Follow the instructions from Step 2 to go back and remove the **Similar Properties** section that you created.


<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Exercise_2.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Exercise_4.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
