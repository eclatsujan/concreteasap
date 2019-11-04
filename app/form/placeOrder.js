export const orderForm = {
    types: [
        {label: "Types", key: ""}, {label: "Standard Mix", key: "standard-mix"},
        {label: "Block Fill Mix", key: "block-fill"}, {label: "Long Line", key: "long-line"},
        {label: "Temmi Mix", key: "temmi-fill"}, {label: "Spray Crete/Shot Crete", key: "crete"},
        {label: "Kerb abd", key: "kerb-abd"},
    ],
    mpa: [
        {label: "MPA", key: ""}, {label: "20", key: "20"},
        {
            label: "25",
            key: "25"
        },
        {
            label: "32",
            key: "32"
        },
        {
            label: "40",
            key: "40"
        },
        {
            label: "50",
            key: "50"
        },
        {
            label: "Special Request",
            key: "special-request"
        },
    ],
    agg: [
        {
            label: "AGG",
            key: ""
        },
        {
            label: "10",
            key: 10
        },
        {
            label: "20",
            key: 20
        },
        {
            label: "SL",
            key: "sl"
        },
    ],
    slu: [{
        label: "SLUMP",
        key: ""
    }, {label: "80", key: 80}, {label: "90", key: 90}, {label: "100", key: 100}, {label: "150", key: 150}],
    acc: [{
        label: "ACC",
        key: ""
    }, {label: "1% Bronze", key: "1%"}, {label: "2% Sliver", key: "2%"}, {label: "3% Gold", key: "3%"}],
    placement_types: [{label: "Placement Type", key: ""}, {label: "Chute", key: "Chute", value: "Chute"},
        {label: "Line Pump", key: "Line Pump", value: "Line Pump"}, {
            label: "Boom Pump",
            key: "Boom Pump",
            value: "Boom Pump"
        }],
    message_required: [{label: "Message Required Y/N", key: ""}, {label: "Yes", key: "Yes"}, {label: "No", key: "No"}],
    site_call: [{label:"On Site/On Call",key:""},{label: "On Site", key: "On Site"}, {label: "On Call", key: "On Call"}],
    time_difference_deliveries: [{label: "Time Between Deliveries", key: ""}, {
        label: "10min",
        key: "10min"
    }, {label: "20min", key: "20min"}, {label: "30min", key: "30min"}],
    urgency: [{label: "Time Urgency", key: ""}, {
        label: "Immediate",
        key: "Immediate"
    }, {label: "With-in 5 days", key: "With-in 5 days"},]
};

