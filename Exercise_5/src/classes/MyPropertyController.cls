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