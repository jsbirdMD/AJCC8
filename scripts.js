function UpdateStage() {
    var update = ""
    var func = document.querySelector('input[name="CLorP"]:checked').value;

    var Tu = document.querySelector('input[name="Tumor"]:checked').value;
    var No = document.querySelector('input[name="Node"]:checked').value;
    var Me = document.querySelector('input[name="Metastasis"]:checked').value;
    var Gr = document.querySelector('input[name="Grade"]:checked').value;
    var He2 = document.querySelector('input[name="Her2"]:checked').value;
    var EsR = document.querySelector('input[name="ER"]:checked').value;
    var PrR = document.querySelector('input[name="PR"]:checked').value;
    var Odx = document.querySelector('input[name="OncDx"]:checked').value;

    if (func == 'clinical' && Gr == '0' && He2 == '0' && EsR == '0' && PrR == '0') {
      update = oldstaging(Tu, No, Me);
    }
    else if (func == 'clinical'){
      update = clinical(Tu, No, Me, Gr, He2, EsR, PrR);
    }
    else if (func == 'pathological') {
      update = pathological(Tu, No, Me, Gr, He2, EsR, PrR, Odx);
    }

    document.getElementById("results").innerHTML = "The" + func + "stage is"+ update;
}

function oldstaging(T, N, M) {
  if ((T == 'Tis' && N == 'N0' && M == 'M0')) {
    return '0';
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0')) {
    return 'IA';
  }
  else if ((T == 'T0' && N == 'N1mi' && M == 'M0')
  || (T == 'T1' && N == 'N1mi' && M == 'M0')) {
    return 'IB';
  }
  else if ((T == 'T0' && N == 'N1' && M == 'M0')
  || (T == 'T1' && N == 'N1' && M == 'M0')
  || (T == 'T2' && N == 'N0' && M == 'M0')) {
    return 'IIA';
  }
  else if ((T == 'T2' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N0' && M == 'M0')) {
    return 'IIB';
  }
  else if ((T == 'T0' && N == 'N2' && M == 'M0')
  || (T == 'T1' && N == 'N2' && M == 'M0')
  || (T == 'T2' && N == 'N2' && M == 'M0')
  || (T == 'T3' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N2' && M == 'M0')) {
    return 'IIIA';
  }
  else if ((T == 'T4' && N == 'N0' && M == 'M0')
  || (T == 'T4' && N == 'N1' && M == 'M0')
  || (T == 'T4' && N == 'N2' && M == 'M0')) {
    return 'IIIB';
  }
  else if (N == 'N3' && M == 'M0') {
    return 'IIIC';
  }
  else if (M == 'M1') {
    return 'IV';
  }
  else {
    return 'error';
  }
}

function clinical(T, N, M, G, H2, ER, PR) {
  if ((T == 'Tis' && N == 'N0' && M == 'M0')
  || (T == 'T0' && N == 'N0' && M == 'M0')) {
    return '0';
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0')
  || (T == 'T0' && N == 'N1mi' && M == 'M0')
  || (T == 'T1' && N == 'N1mi' && M == 'M0')) {
      if ((G == '1' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '+')) {
        return 'IB';
      }
      else {
        return 'IA';
      }
  }
  else if ((T == 'T0' && N == 'N1' && M == 'M0')
  || (T == 'T1' && N == 'N1' && M == 'M0')
  || (T == 'T2' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IB';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '+')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIB';
      }
      else {
        return 'IIA';
      }
  }
  else if ((T == 'T2' && N == 'N1mi' && M == 'M0')
  || (T == 'T2' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IB';
      }
      else if ((G == '1' && H2 == '+' && ER == '+' && PR == '-')
      || (G == '1' && H2 == '+' && ER == '-' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '-')
      || (G == '2' && H2 == '+' && ER == '-' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IIA';
      }
      else if ((G == '3' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '+')) {
        return 'IIIA';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIB';
      }
      else {
        return 'IIB';
      }
  }
  else if ((T == 'T0' && N == 'N2' && M == 'M0')
  || (T == 'T1' && N == 'N2' && M == 'M0')
  || (T == 'T2' && N == 'N2' && M == 'M0')
  || (T == 'T3' && N == 'N1mi' && M == 'M0')
  || (T == 'T3' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N2' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IIA';
      }
      else if ((G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IIB';
      }
      else if ((G == '1' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '+')) {
        return 'IIIB';
      }
      else if ((G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIC';
      }
      else {
        return 'IIIA';
      }
  }
  else if ((T == 'T4' && N == 'N0' && M == 'M0')
  || (T == 'T4' && N == 'N1mi' && M == 'M0')
  || (T == 'T4' && N == 'N1' && M == 'M0')
  || (T == 'T4' && N == 'N2' && M == 'M0')
  || (N == 'N3' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IIIA';
      }
      else if ((G == '1' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '+')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIC';
      }
      else {
        return 'IIIB';
      }
  }
  else if (M == 'M1') {
    return 'IV';
  }
  else {
    return 'error';
  }
}

/*
console.log(clinical('Tis', 'N0', 'M0', '1', '+','+','+'));

console.log(clinical('T1', 'N0', 'M0', '3', '-','+','-'));
console.log(clinical('T0', 'N1mi', 'M0', '2', '-','-','+'));
console.log(clinical('T1', 'N1mi', 'M0', '1', '+','-','-'));

console.log(clinical('T0', 'N1', 'M0', '3', '-','+','-'));
console.log(clinical('T1', 'N1', 'M0', '2', '+','-','+'));
console.log(clinical('T2', 'N0', 'M0', '1', '-','+','+'));

console.log(clinical('T2', 'N1mi', 'M0', '3', '-','+','-'));
console.log(clinical('T2', 'N1mi', 'M0', '3', '+','+','+'));
console.log(clinical('T2', 'N1', 'M0', '2', '+','+','-'));
console.log(clinical('T2', 'N1', 'M0', '2', '-','-','+'));
console.log(clinical('T3', 'N0', 'M0', '1', '+','-','+'));

console.log(clinical('T0', 'N2', 'M0', '3', '-','-','-'));
console.log(clinical('T1', 'N2', 'M0', '2', '-','+','+'));
console.log(clinical('T2', 'N2', 'M0', '1', '-','-','-'));
console.log(clinical('T3', 'N1mi', 'M0', '3', '+','+','+'));
console.log(clinical('T3', 'N1', 'M0', '2', '-','-','+'));
console.log(clinical('T3', 'N2', 'M0', '1', '+','-','-'));

console.log(clinical('T4', 'N0', 'M0', '3', '-','+','+'));
console.log(clinical('T4', 'N1mi', 'M0', '2', '+','+','+'));
console.log(clinical('T4', 'N1', 'M0', '1', '-','-','-'));
console.log(clinical('T4', 'N2', 'M0', '3', '+','+','+'));
console.log(clinical('T1', 'N3', 'M0', '1', '-','-','-'));

console.log(clinical('T0', 'N0', 'M1', '3', '+','-','-'));
console.log(clinical('T3', 'N1mi', 'M1', '2', '-','+','-'));
console.log(clinical('T4', 'N2', 'M1', '1', '+','+','+'));

0

IB
IA
IA

IIB
IIA
IB

IIIA
IB
IIA
IIB
IIA

IIIC
IIA
IIIB
IIB
IIIA
IIIA

IIIB
IIIA
IIIC
IIIB
IIIC

IV
IV
IV
*/

function pathological(T, N, M, G, H2, ER, PR, Odx) {
  if ((T == 'Tis' && N == 'N0' && M == 'M0')
  || (T == 'T0' && N == 'N0' && M == 'M0')) {
    return '0';
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0' && H2 == '-' && ER == '+' && Odx == '+')
  || (T == 'T2' && N == 'N0' && M == 'M0' && H2 == '-' && ER == '+' && Odx == '+')) {
    return 'IA'
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0')
  || (T == 'T0' && N == 'N1mi' && M == 'M0')
  || (T == 'T1' && N == 'N1mi' && M == 'M0')) {
      if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IB';
      }
      else {
        return 'IA';
      }
  }
  else if ((T == 'T0' && N == 'N1' && M == 'M0')
  || (T == 'T1' && N == 'N1' && M == 'M0')
  || (T == 'T2' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IA';
      }
      else if ((G == '1' && H2 == '+' && ER == '+' && PR == '-')
      || (G == '1' && H2 == '+' && ER == '-' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '1' && H2 == '-' && ER == '-' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '-')
      || (G == '2' && H2 == '+' && ER == '-' && PR == '+')
      || (G == '3' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IB';
      }
      else {
        return 'IIA';
      }
  }
  else if ((T == 'T2' && N == 'N1mi' && M == 'M0')
  || (T == 'T2' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IA';
      }
      else if ((G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IB';
      }
      else if ((G == '3' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IIA';
      }
      else if ((G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIA';
      }
      else {
        return 'IIB';
      }
  }
  else if ((T == 'T0' && N == 'N2' && M == 'M0')
  || (T == 'T1' && N == 'N2' && M == 'M0')
  || (T == 'T2' && N == 'N2' && M == 'M0')
  || (T == 'T3' && N == 'N1mi' && M == 'M0')
  || (T == 'T3' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N2' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IB';
      }
      else if ((G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        return 'IIA';
      }
      else if ((G == '3' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IIB';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIB';
      }
      else if ((G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIC';
      }
      else {
        return 'IIIA';
      }
  }
  else if ((T == 'T4' && N == 'N0' && M == 'M0')
  || (T == 'T4' && N == 'N1mi' && M == 'M0')
  || (T == 'T4' && N == 'N1' && M == 'M0')
  || (T == 'T4' && N == 'N2' && M == 'M0')
  || (N == 'N3' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        return 'IIIA';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '+' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '+')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        return 'IIIC';
      }
      else {
        return 'IIIB';
      }
  }
  else if (M == 'M1') {
    return 'IV';
  }
  else {
    return 'error';
  }
}

/*
console.log(pathological('Tis', 'N0', 'M0', '1', '+','+','+','+'));

console.log(pathological('T1', 'N0', 'M0', '3', '-','-','-','-'));
console.log(pathological('T0', 'N1mi', 'M0', '2', '-','-','+','+'));
console.log(pathological('T1', 'N1mi', 'M0', '1', '+','-','-','+'));

console.log(pathological('T0', 'N1', 'M0', '3', '-','+','-','+'));
console.log(pathological('T1', 'N1', 'M0', '2', '+','-','+','+'));
console.log(pathological('T2', 'N0', 'M0', '1', '-','+','+','-'));

console.log(pathological('T2', 'N1mi', 'M0', '3', '-','+','+','+'));
console.log(pathological('T2', 'N1mi', 'M0', '3', '-','-','-','+'));
console.log(pathological('T2', 'N1', 'M0', '2', '+','+','-','+'));
console.log(pathological('T2', 'N1', 'M0', '2', '-','+','+','+'));
console.log(pathological('T3', 'N0', 'M0', '1', '-','+','+','+'));

console.log(pathological('T0', 'N2', 'M0', '3', '-','-','-','+'));
console.log(pathological('T1', 'N2', 'M0', '2', '-','+','+','+'));
console.log(pathological('T2', 'N2', 'M0', '1', '-','-','-','+'));
console.log(pathological('T3', 'N1mi', 'M0', '3', '+','+','+','+'));
console.log(pathological('T3', 'N1', 'M0', '2', '-','-','+','+'));
console.log(pathological('T3', 'N2', 'M0', '1', '+','-','-','+'));

console.log(pathological('T4', 'N0', 'M0', '3', '-','+','+','+'));
console.log(pathological('T4', 'N1mi', 'M0', '2', '-','-','-','+'));
console.log(pathological('T4', 'N1', 'M0', '1', '-','+','+','+'));
console.log(pathological('T4', 'N2', 'M0', '3', '+','+','+','+'));
console.log(pathological('T1', 'N3', 'M0', '3', '-','+','-','+'));

console.log(pathological('T0', 'N0', 'M1', '3', '+','-','-','+'));
console.log(pathological('T3', 'N1mi', 'M1', '2', '-','+','-','+'));
console.log(pathological('T4', 'N2', 'M1', '1', '+','+','+','+'));

console.log(pathological('T1', 'N0', 'M0', '3', '-','+','+','+'));
console.log(pathological('T2', 'N0', 'M0', '1', '-','+','-','+'));


0

IB
IA
IA

IIA
IB
IA

IIA
IIIA
IIB
IB
IA

IIIC
IB
IIIA
IIA
IIIA
IIIA

IIIB
IIIC
IIIA
IIIB
IIIC

IV
IV
IV

IA
IA
*/
