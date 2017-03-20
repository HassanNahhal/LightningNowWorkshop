({
    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var action = component.get("c.getSimilarProperties");
        action.setParams({
            recordId: recordId,
            searchCriteria: component.get("v.searchCriteria")
        });
        action.setCallback(this, function(response){
            var similarProperties = response.getReturnValue();
            component.set("v.similarProperties", similarProperties);
        });
        $A.enqueueAction(action);
    },

    navToRecord : function (component, event, helper) {
        var selectedItem = event.currentTarget;
        var recordId = selectedItem.dataset.record;
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId
        });
        navEvt.fire();
    },

    editRecord : function(component, event, helper) {
        var recordId = event.getSource().get("v.value");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recordId,
            searchCriteria: 'Price'
        });
        editRecordEvent.fire();
    }

})