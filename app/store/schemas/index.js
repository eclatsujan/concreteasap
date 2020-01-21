import { normalize, schema } from 'normalizr';


// Define a users schema
// export const user = new schema.Entity('users');


// Define your comments schema

const order_concrete=new schema.Entity('order_concrete');

// Define a users schema
const user = new schema.Entity('user');

const bids= new schema.Entity("bids");

const order = new schema.Entity('orders', {
    order_concrete: order_concrete,
    user:user,
    bids:[bids]
});

// const orders=new schema.Array
export const normalizedOrderData = (originalData) =>{
    return normalize(originalData, [order])
};

