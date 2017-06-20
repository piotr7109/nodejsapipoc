var dog = {
    name: "Fred",
    age: 10,
    happy: true,
    makeAWoof: function () {
        alert("Woof");
    }
};

function doSomething() {
    for (let index = 0; index < 10; index++) {
        ///
    }

    console.log(index); //10
}

doSomething();


var apartments = [
    {name: 'Alpha Hotel', city: 'Kraków', size: 50},
    {name: 'Omega Motel', city: 'Warszawa', size: 120},
    {name: 'Gamma Place', city: 'Katowice', size: 35},
    {name: 'Beta Hostel', city: 'Cracow', size: 25},
    {name: 'HSBC Kapelanka', city: 'Lubin', size: 75}
];

apartments.filter(apartment => apartment.city === "Kraków");

apartments.map(apartment => apartment.forRent = true);


20 == "20"; //true
0 == false; // true
undefined == null; //true

20 === "20"; // false
0 === false; //false
undefined === null; //false

var a = "dupa";

switch (a) {
    case "dupa":
        console.log(1);
        break;
    case "cycki":
    case "cyce":
        console.log(2);
        break;
    default:
        console.log(100);
        break;
}

var map = {
    dupa: 1,
    cyce: 2,
    cycki: map.cyce,
    default: 100
};

if (map.hasOwnProperty(a)) {
    console.log(map[a]);
} else {
    console.log(map.default);
}
