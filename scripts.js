
//Updates the staging based off radio labels pressed
function UpdateStage() {
    var stage = ""
    var func = document.querySelector('input[name="CLorP"]:checked').value;

    var Tu = document.querySelector('input[name="Tumor"]:checked').value;
    var No = document.querySelector('input[name="Node"]:checked').value;
    var Me = document.querySelector('input[name="Metastasis"]:checked').value;
    var Gr = document.querySelector('input[name="Grade"]:checked').value;
    var He2 = document.querySelector('input[name="Her2"]:checked').value;
    var EsR = document.querySelector('input[name="ER"]:checked').value;
    var PrR = document.querySelector('input[name="PR"]:checked').value;
    var Odx = document.querySelector('input[name="OncDx"]:checked').value;

    if (func == 'clinical'){
      [func, stage] = clinical(Tu, No, Me, Gr, He2, EsR, PrR);
    }
    else if (func == 'pathological') {
      [func, stage] = pathological(Tu, No, Me, Gr, He2, EsR, PrR, Odx);
    }

    document.getElementById("results").innerHTML = "The " + func + " stage is "+ stage;
}

// Only reveal OncDX tab when appropriate
// (Path, T1N0M0 or T2N0M0, Her2 -, Er +)
function revealOncDx() {
    document.getElementById("results").innerHTML = ""
    var oncrev = document.getElementById("hidden");
    var func = document.querySelector('input[name="CLorP"]:checked').value;
    var T = document.querySelector('input[name="Tumor"]:checked').value;
    var N = document.querySelector('input[name="Node"]:checked').value;
    var M = document.querySelector('input[name="Metastasis"]:checked').value;
    var He2 = document.querySelector('input[name="Her2"]:checked').value;
    var EsR = document.querySelector('input[name="ER"]:checked').value;

    if ((func == 'pathological' && T == 'T1' && N == 'N0' && M == 'M0' && He2 == '-' && EsR =='+')
    ||(func == 'pathological' && T == 'T2' && N == 'N0' && M == 'M0' && He2 == '-' && EsR =='+')) {

      if (oncrev.style.display === "none") {
          oncrev.style.display = "block";
      }
    }
    else {
      oncrev.style.display = "none";
      document.getElementById("oncchecked").checked = true;
    }
    //var Odx = document.querySelector('input[name="OncDx"]:checked').value;
}

//function for the anatomical function for staging
//(when grade, ER, PR, or Her2 aren't available)
function anatomical(T, N, M) {
  var func = 'anatomical';
  var stage = 'error';
  if ((T == 'Tis' && N == 'N0' && M == 'M0')
  ||(T == 'T0' && N == 'N0' && M == 'M0')) {
    stage = '0';
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0')) {
    stage = 'IA';
  }
  else if ((T == 'T0' && N == 'N1mi' && M == 'M0')
  || (T == 'T1' && N == 'N1mi' && M == 'M0')) {
    stage = 'IB';
  }
  else if ((T == 'T0' && N == 'N1' && M == 'M0')
  || (T == 'T1' && N == 'N1' && M == 'M0')
  || (T == 'T2' && N == 'N0' && M == 'M0')) {
    stage = 'IIA';
  }
  else if ((T == 'T2' && N == 'N1mi' && M == 'M0')
  || (T == 'T2' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N0' && M == 'M0')) {
    stage = 'IIB';
  }
  else if ((T == 'T0' && N == 'N2' && M == 'M0')
  || (T == 'T1' && N == 'N2' && M == 'M0')
  || (T == 'T2' && N == 'N2' && M == 'M0')
  || (T == 'T3' && N == 'N1mi' && M == 'M0')
  || (T == 'T3' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N2' && M == 'M0')) {
    stage = 'IIIA';
  }
  else if ((T == 'T4' && N == 'N0' && M == 'M0')
  || (T == 'T4' && N == 'N1mi' && M == 'M0')
  || (T == 'T4' && N == 'N1' && M == 'M0')
  || (T == 'T4' && N == 'N2' && M == 'M0')) {
    stage = 'IIIB';
  }
  else if (N == 'N3' && M == 'M0') {
    stage = 'IIIC';
  }
  else if (M == 'M1') {
    stage = 'IV';
  }
  else {
    stage = 'error';
  }

  return [func, stage];
}

// clinical function for staging
function clinical(T, N, M, G, H2, ER, PR) {
  var func = 'clinical prognostic';
  var stage = 'error';

  if (ER == '0' && PR == '0') {
    [func, stage] = anatomical(T, N, M);
  }
  else if ((T == 'Tis' && N == 'N0' && M == 'M0')
  || (T == 'T0' && N == 'N0' && M == 'M0')) {
    stage = '0';
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0')
  || (T == 'Tis' && N == 'N1mi' && M == 'M0')
  || (T == 'T0' && N == 'N1mi' && M == 'M0')
  || (T == 'T1' && N == 'N1mi' && M == 'M0')) {
      if ((G == '1' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && (ER == '+' || PR == '+'))) {
        stage = 'IB';
      }
      else if (G != '0') {
        stage = 'IA';
      }
  }
  else if ((T == 'Tis' && N == 'N1' && M == 'M0')
  || (T == 'T0' && N == 'N1' && M == 'M0')
  || (T == 'T1' && N == 'N1' && M == 'M0')
  || (T == 'T2' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IB';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && (ER == '+' || PR == '+'))
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIB';
      }
      else if (G != '0') {
        stage = 'IIA';
      }
  }
  else if ((T == 'T2' && N == 'N1mi' && M == 'M0')
  || (T == 'T2' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IB';
      }
      else if ((G == '1' && H2 == '+' && (ER == '+' || PR == '+'))
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && (ER == '+' || PR == '+'))
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IIA';
      }
      else if (G == '3' && H2 == '-' && (ER == '+' || PR == '+')) {
        stage = 'IIIA';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIB';
      }
      else if (G != '0') {
        stage = 'IIB';
      }
  }
  else if ((T == 'Tis' && N == 'N2' && M == 'M0')
  || (T == 'T0' && N == 'N2' && M == 'M0')
  || (T == 'T1' && N == 'N2' && M == 'M0')
  || (T == 'T2' && N == 'N2' && M == 'M0')
  || (T == 'T3' && N == 'N1mi' && M == 'M0')
  || (T == 'T3' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N2' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IIA';
      }
      else if ((G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IIB';
      }
      else if ((G == '1' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && (ER == '+' || PR == '+'))) {
        stage = 'IIIB';
      }
      else if ((G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIC';
      }
      else if (G != '0') {
        stage = 'IIIA';
      }
  }
  else if ((T == 'T4' && N == 'N0' && M == 'M0')
  || (T == 'T4' && N == 'N1mi' && M == 'M0')
  || (T == 'T4' && N == 'N1' && M == 'M0')
  || (T == 'T4' && N == 'N2' && M == 'M0')
  || (N == 'N3' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IIIA';
      }
      else if ((G == '1' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && (ER == '+' || PR == '+'))
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIC';
      }
      else if (G != '0') {
        stage = 'IIIB';
      }
  }
  else if (M == 'M1') {
    stage = 'IV';
  }

  if (stage == 'error') {
    [func, stage] = anatomical(T, N, M);
  }

  return [func, stage];
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

// pathological function for staging
function pathological(T, N, M, G, H2, ER, PR, Odx) {
  var func = 'pathological prognostic';
  var stage = 'error';

  if (ER == '0' && PR == '0') {
    [func, stage] = anatomical(T, N, M);
  }
  else if ((T == 'Tis' && N == 'N0' && M == 'M0')
  || (T == 'T0' && N == 'N0' && M == 'M0')) {
    stage = '0';
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0' && H2 == '-' && ER == '+' && Odx == '+')
  || (T == 'T2' && N == 'N0' && M == 'M0' && H2 == '-' && ER == '+' && Odx == '+')) {
    stage = 'IA'
  }
  else if ((T == 'T1' && N == 'N0' && M == 'M0')
  || (T == 'Tis' && N == 'N1mi' && M == 'M0')
  || (T == 'T0' && N == 'N1mi' && M == 'M0')
  || (T == 'T1' && N == 'N1mi' && M == 'M0')) {
      if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IB';
      }
      else if (H2 == '+' && ER == "+" && PR == "+") {
        stage = 'IA';
      }
      else if (G != '0') {
        stage = 'IA';
      }
  }
  else if ((T == 'Tis' && N == 'N1' && M == 'M0')
  || (T == 'T0' && N == 'N1' && M == 'M0')
  || (T == 'T1' && N == 'N1' && M == 'M0')
  || (T == 'T2' && N == 'N0' && M == 'M0')) {
      if ((T == 'T1' && N == 'N1' && M == 'M0')
      && H2 == '+' && ER == '+' && PR == '+') {
        stage = 'IA';
      }
      else if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IA';
      }
      else if ((G == '1' && H2 == '+' && ER == '+' && PR == '-')
      || (G == '1' && H2 == '+' && ER == '-' && PR == '+')
      || (G == '1' && H2 == '-' && (ER == '+' || PR == '+'))
      || (G == '2' && H2 == '+' && (ER == '+' || PR == '+'))
      || (G == '3' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IB';
      }
      else if (G != '0') {
        stage = 'IIA';
      }
  }
  else if ((T == 'T2' && N == 'N1mi' && M == 'M0')
  || (T == 'T2' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N0' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IA';
      }
      else if ((G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IB';
      }
      else if ((G == '3' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IIA';
      }
      else if ((G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIA';
      }
      else if (G != '0') {
        stage = 'IIB';
      }
  }
  else if ((T == 'Tis' && N == 'N2' && M == 'M0')
  || (T == 'T0' && N == 'N2' && M == 'M0')
  || (T == 'T1' && N == 'N2' && M == 'M0')
  || (T == 'T2' && N == 'N2' && M == 'M0')
  || (T == 'T3' && N == 'N1mi' && M == 'M0')
  || (T == 'T3' && N == 'N1' && M == 'M0')
  || (T == 'T3' && N == 'N2' && M == 'M0')) {
      if ((G == '1' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '1' && H2 == '-' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '+' && ER == '+' && PR == '+')
      || (G == '2' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IB';
      }
      else if ((G == '3' && H2 == '+' && ER == '+' && PR == '+')) {
        stage = 'IIA';
      }
      else if ((G == '3' && H2 == '-' && ER == '+' && PR == '+')) {
        stage = 'IIB';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIB';
      }
      else if ((G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIC';
      }
      else if (G != '0') {
        stage = 'IIIA';
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
        stage = 'IIIA';
      }
      else if ((G == '2' && H2 == '-' && ER == '-' && PR == '-')
      || (G == '3' && H2 == '-' && (ER == '+' || PR == '+'))
      || (G == '3' && H2 == '-' && ER == '-' && PR == '-')) {
        stage = 'IIIC';
      }
      else if (G != '0') {
        stage = 'IIIB';
      }
  }
  else if (M == 'M1') {
    stage = 'IV';
  }

  if (stage == 'error') {
    [func, stage] = anatomical(T, N, M);
  }

  return [func, stage];
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
