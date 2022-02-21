class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {//searching product with keyword
            name : {
                $regex: this.queryStr.keyword,
                $options: "i",// for insensetive case
              },
        } : {};

      this.query = this.query.find({ ...keyword });

        return this;
    }

    filter(){//for category 
        const queryCopy = {...this.queryStr} //making copy so that queryStr won't get changed
        
        
        //removing some field for category
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach(key => delete queryCopy[key]);

        //filter for price and rating
        
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));


        return this;
    }

    pagination(resultPerPage){
         const currentPage = Number(this.queryStr.page) || 1; 

         // if we have total 50 products then we have to skip no product for 1st page skip 10 products for 2nd page, and 20 products for 3rd page.
         const skip = resultPerPage * (currentPage - 1);

         // this.query-> gives all products
         //limits(resultPerPage)-> gives products per page to be considered
         //skip(skip)-> will skip the number of 'skip'(defined above) products 
      this.query = this.query.limit(resultPerPage).skip(skip); 

      return this;

    }
}

module.exports = ApiFeatures;