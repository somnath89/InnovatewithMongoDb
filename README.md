# InnovatewithMongoDb
Repository for "Innovate with MongoDB" hackathon

Steps to set up code for local environment.

**Frontend**

check out code in local from github
npm i
npm start

For build and deploy run '**npm run build**' and then upload 'build' directory contents to '**Hosting**' tab under atlas .

Deployed app url -- https://searchapp-qqtoi.mongodbstitch.com/

**Backend services**

For backend services code is available in "Realm Functions" directory. Each of the .txt files included in the directory refers to independent realm functions which are acting as the respective http end points.

Change and deploy from atlas realm editor as needed.

**Autocomplete API** -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/autocomplete
**Search Open Restaurants API** -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/searchRestaurants
**Search Map box area API** -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/searchInBox
**Apply filter API** -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/searchWhenDone
