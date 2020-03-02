import { normalize, schema } from 'normalizr';

const order_reo=new schema.Entity('order_reo');

// Define a users schema
const user = new schema.Entity('user');

const bids= new schema.Entity("bids");

const order = new schema.Entity('orders', {
    order_reo: order_reo,
    user:user,
    bids:[bids],
});