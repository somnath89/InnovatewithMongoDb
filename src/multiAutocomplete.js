exports = async function(payload, response){
   
    
    const postbody = EJSON.parse(payload.body.text())
    
    console.log("Payload--"+JSON.stringify(postbody));
 
     // Querying a mongodb service:
      const db = context.services.get("mongodb-atlas").db("sample_restaurants");
      
      let restaurants = db.getSiblingDb("sample_airbnb").listingsAndReviews.aggregate(
               [
                 {
                   $lookup: {
                     from:"sample_airbnb", coll: "listingsAndReviews",
                     let: { "name": "$name" },
                     pipeline: [
                       {
                         $match: {
                           $expr: {
                             $eq: ["$name", "$$name"]
                           }
                         }
                       },
                       {
                         $project : { "_id":0,"name":1}
                       }
                     ],
                     as: "inventory"
                   },
                 },
               ]).toArray();
     
     //let restaurants = collection.aggregate(pipeline).toArray();
     
     console.log(JSON.stringify(restaurants));
     
     response.setStatusCode(200);
     response.setHeader("Content-Type", "application/json");
     response.setBody(JSON.stringify(restaurants));
     
     return response;
 };