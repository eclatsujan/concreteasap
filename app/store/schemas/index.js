import { normalize, schema } from 'normalizr';


// Define a users schema
// export const user = new schema.Entity('users');


// Define your comments schema

export const order_concrete=new schema.Entity('order_concrete');

// Define your article
export const order = new schema.Entity('order', {
    order_concrete: [order_concrete]
});
