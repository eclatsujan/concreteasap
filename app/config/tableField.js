import * as Immutable from 'immutable';

export const tableFields = Immutable.Map({title: "Suburb/Post Code", key: "order.order_concrete.suburb"},
    {title: "Type", key: "order.order_concrete.type"}, {title: "MPA", key: "order.order_concrete.mpa"},
    {title: "Agg", key: "order.order_concrete.agg"}, {title: "slump", key: "order.order_concrete.slump"},
    {title: "ACC", key: "order.order_concrete.acc"},
    {title: "Placement Type", key: "order.order_concrete.placement_type"},
    {title: "Date", key: "order.order_concrete.delivery_date"},
    {title: "Delivery Time", key: "order.order_concrete.time_preference1"},
    {title: "Time Between Deliveries", key: "order.order_concrete.time_deliveries"},
    {title: "On Site/On Call", key: "order.order_concrete.preference"},
    {title: "Message Required", key: "order.order_concrete.message_required"});