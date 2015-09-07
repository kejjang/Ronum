function Ronum(){
    this.min = 1;
    this.max = 4999;
    this.idxNumberToRoman = [];
    this.idxNumberToRoman[1]    = 'I';
    this.idxNumberToRoman[5]    = 'V';
    this.idxNumberToRoman[10]   = 'X';
    this.idxNumberToRoman[50]   = 'L';
    this.idxNumberToRoman[100]  = 'C';
    this.idxNumberToRoman[500]  = 'D';
    this.idxNumberToRoman[1000] = 'M';
    this.idxRomanToNumber = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };
}

Ronum.prototype.conv = function(num){
    if(!+num){
        return this.convRomanToNumber(num);
    }else{
        return this.convNumberToRoman(num);
    }
}

Ronum.prototype.validNum = function(num){
    if(!+num){
        return false;
    }else if(num < this.min || num > this.max){
        return 999;
    }else{
        return true;
    }
}

Ronum.prototype.validRom = function(num){
    var digits = num.split('');
    for(var i in digits){
        if(!this.idxRomanToNumber.hasOwnProperty(digits[i])){
            return false;
        }
    }
    return true;
}

Ronum.prototype.convNumberToRoman = function(num){
    var valid = this.validNum(num);
    if(false === valid){
        return 'not a valid number';
    }else if(valid === 999){
        return 'the number you give is too big or too small';
    }

    var digits = num.toString().split('');
    var ret = [];
    for(var i in digits){
        var base = Math.pow(10, digits.length - 1 - i);
        var n = parseInt(digits[i], 10);

        if(n % 5 == 4){
            if(this.idxNumberToRoman[base * (n + 1)] === undefined){
                ret[i] = Array(n + 1).join(this.idxNumberToRoman[base]);
            }else{
                ret[i] = this.idxNumberToRoman[base] + this.idxNumberToRoman[base * (n + 1)];
            }
        }else{
            ret[i] = Array(Math.floor(n / 5) + 1).join(this.idxNumberToRoman[base * 5]) + Array((n + 1) % 5).join(this.idxNumberToRoman[base]);
        }
    }
    return ret.join('');
}

Ronum.prototype.convRomanToNumber = function(num){
    var valid = this.validRom(num);
    if(false === valid){
        return 'not a valid roman numeral';
    }else if(valid === 999){
        return 'the number you give is too big or too small';
    }

    var digits = num.split('');
    var valid2 = true;

    for(var i in digits){
        digits[i] = this.idxRomanToNumber[digits[i]];
        if(i > 0){
            if(digits[i] > digits[i - 1]){
                if(digits[i] / digits[i - 1] == 10 || digits[i] / digits[i - 1] == 5){
                    digits[i - 1] *= -1;
                }else{
                    valid2 = false;
                }
            }else{
                if(digits.indexOf(digits[i] * -1) > -1){
                    valid2 = false;
                }
            }
        }
    }

    if(false === valid2){
        return 'not a valid roman numeral';
    }
    return digits.sum();
}

// array utils
Array.prototype.sum = function(){
    var __sum = 0;
    for(var i = 0; i < this.length; i++){
        __sum += this[i];
    }
    return __sum;
}
Object.defineProperty(Array.prototype, 'sum', {enumerable: false});
