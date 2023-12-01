export class Product {

    constructor(public id : Number,
                public sku : String,
                public name : String,
                public description : String,
                public unitPrice : Number,
                public imageURL : String,
                public active : Boolean,
                public unitsInStock : Number,
                public dateCreated : Date,
                public lastUpdated : Date){

    }
}
