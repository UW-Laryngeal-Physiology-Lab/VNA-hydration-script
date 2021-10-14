// include('./porn.csv')


//Equation: E' = H * (3.978E - 30f^3 - 1.811E - 19f^2 + 1.288E - 9f + 36.66) - (2.004E - 30f^3 - 1.278E - 19f^2 + 2.633E - 9f - 25.29)

//With respect to E': H = E' / ((3.978E - 30f^3 - 1.811E - 19f^2 + 1.288E - 9f + 36.66) - (2.004E - 30f^3 - 1.278E - 19f^2 + 2.633E - 9f - 25.29))



//need to find a way to import and parse data automatically.
let data = 
    [{freq: 1000000.0000, ePrime: 9.999000e+003, eDblPrime: 9.999000e+003},
    {freq: 200990000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 400980000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 600970000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 800960000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 1000950000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 1200940000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 1400930000.0000, ePrime: -1.000000e+006, eDblPrime:-1.000000e+006},
    {freq: 1600920000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 1800910000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 2000900000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 2200890000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 2400880000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006},
    {freq: 2600870000.0000, ePrime: -1.000000e+006, eDblPrime: -1.000000e+006}]
   

function hydration(ePrime, freq){
    let percentHydration = (ePrime)/((39.78 - (30 * (freq)^3) - 18.11 - (19 * freq^2) + 12.88 - (9 * freq) + 36.66) - (20.04 - (30 * freq^3) - 12.78 - (19 * freq^2) + 26.33 - (9 * freq) - 25.29))

    document.getElementById('display').textContent = percentHydration;
    return percentHydration;
    
}

hydration(9.999000e+003, 1000000.0000);

