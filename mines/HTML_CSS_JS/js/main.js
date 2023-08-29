var Mines = {

  listRandomBombs: [],
  
  init: function() {
    
  },

  gameModeNormalBtnColor: function () {
    $("#normal").removeClass("game_mode_btn_inner");
    $("#normal").addClass("game_mode_btn_select");

    $("#auto").removeClass("game_mode_btn_select");
    $("#auto").addClass("game_mode_btn_inner");
  },

  gameModeAutoBtnColor: function () {
    $("#auto").removeClass("game_mode_btn_inner");
    $("#auto").addClass("game_mode_btn_select");

    $("#normal").removeClass("game_mode_btn_select");
    $("#normal").addClass("game_mode_btn_inner");
  },

  mascaraMoeda: function () {
    $("#game_input_number_bet_value").mask("#.##0,00", { reverse: true });
  },

  /* ↓ Valor mínimo de aposta*/
  minValue: function () {
    var inputMinValue = '0,10';
    $("#game_input_number_bet_value").val(inputMinValue);

    inputMinValue = inputMinValue.replaceAll(',', '.');
    minFloat = parseFloat(inputMinValue);
    console.log(minFloat);

  },
  /* ↓ Valor máximo de aposta */
  maxValue: function() {
    var inputMaxValue = '100,00';
    $("#game_input_number_bet_value").val(inputMaxValue);
    
    inputMaxValue = inputMaxValue.replaceAll(',', '.');
    maxFloat = parseFloat(inputMaxValue);
    console.log(maxFloat);
  },

  /* ↓ Função para subtrair o valor do input até R$ 0,10*/
  subValueInput: function() {
    var value = Mines.getFloatValue();
    if (value >= 0.20) {
      var subValue = value - 0.1;
      subValue = Mines.getFormatterPtBr(subValue);
      
      $("#game_input_number_bet_value").val(subValue);
    } else {
      alert("O valor mínimo de aposta é R$ 0,10");
    }
  },

  /* ↓ Função para somar o valor do input até R$ 100,00*/
  somValueInput: function() {
    var value = Mines.getFloatValue();
    if (value <= 99.90) {
      var somValue = value + 0.1;
      somValue = Mines.getFormatterPtBr(somValue);
      
      $("#game_input_number_bet_value").val(somValue);
    } else {
      alert("O valor máximo de aposta é R$ 100,00");
    }
  },

  getFormatterPtBr: function(value) {
    var formatter = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    return formatter.format(value); 
  },

  getFloatValue: function() {
    var vlFloat = 0;
    var value = Mines.getValue();

    if (value) {
      value = value.replaceAll('.', '');
      value = value.replaceAll(',', '.');
      vlFloat = parseFloat(value);
    }

    return vlFloat;
  },

  getValue: function() {
    return $("#game_input_number_bet_value").val();
  },

  getQuantMines: function() {
    return $("#mines").val();
  },

  getIntValue: function() {
    var quantMines = Mines.getQuantMines();
    var vlInt = parseInt(quantMines)
    return vlInt;

  },

  /* Subtrair 1 mina da quantidade */
  subMine: function() {
    var value = Mines.getIntValue();
    if (value > 2) {
      var subMine = value - 1;
      return $("#mines").val(subMine);
      console.log(subMine);
    } 
    else {
      alert("A quantidade mínima de minas é 2");
    }
  },
  
  /* Somar 1 mina da quantidade */
  somMine: function() {
    var value = Mines.getIntValue();
    if (value < 24) {
      var somMine = value + 1;
      return $("#mines").val(somMine);
      console.log(somMine);
    } else {
      alert("A quantidade máxima de minas é 24");
    }
  },

  /* 5 Minas */
  fiveMines: function() {
    var value = Mines.getIntValue();
    value = 5;
    console.log(value);
    return $("#mines").val(value);
  },

  /* 3 Minas */
  threeMines: function() {
    var value = Mines.getIntValue();
    value = 3;
    console.log(value);
    return $("#mines").val(value);
  },

  /* 10 Minas */
  tenMines: function() {
    var value = Mines.getIntValue();
    value = 10;
    console.log(value);
    return $("#mines").val(value);
  },

  /* 20 Minas */
  twentyMine: function() {
    var value = Mines.getIntValue();
    value = 20;
    console.log(value);
    return $("#mines").val(value);
    
  },


  /* GERAR UM NÚMERO ALEATÓRIO ENTRE 1 E 25 */
  randomNumber: function() {
    return Math.floor(Math.random() * 25) + 1;
  },
  // função do botão de iniciar jogo
  startTiles: function() {
    Mines.listRandomBombs = Mines.getTiles();
    Mines.unlockTable();
    Mines.gemasRestantes();
    Mines.percentMines();
    Mines.openTiles();
    Mines.subSaldo();
    // Mines.addMultiple();
    $(".classeNova").css("pointer-events","auto");
    $(".game_config_btn").css("pointer-events","none");
    $(".game_input_wrapper").css("pointer-events","none");
    $(".game_bet_config_btn").css("pointer-events","none");
    $("#normal").css("pointer-events","none");
    $("#auto").css("pointer-events","none");
    
  },
  // desbloquear mesa de jogo
  unlockTable: function() {
    $(".classeNova").removeClass("betting_square");
    $(".classeNova").addClass("betting_square_free");
  },
  // bloquear mesa de jogo
  blockTable: function() {
    $(".classeNova").removeClass("betting_square_free");
    $(".classeNova").addClass("betting_square");
    $(".classeNova").removeClass("svg_diamond svg_bomb");
  },

  getTiles: function() {
    var listRandom = [];
    var value = Mines.getIntValue();
    
    while (listRandom.length < value) {
      var rn = Mines.randomNumber();
      if (listRandom.indexOf(rn) === -1) {
        listRandom.push(rn);
      }
    }

    return listRandom;
  },

  findTile: function(posicao) {
    $('.betting_square').each(function(i, area) {
      var psGrid = $(area).attr("value");
      if (parseInt(psGrid) === posicao) {
        // chamar um css para alterar para bomba

        $("#telha").addClass("svg_bomb");
        console.log('adicionar bomba na posicao ' + posicao);
      }
    });
  },

  clearToPlayAgain: function() {
    // limpar para repetir o jogo
    listRandom = [];
    console.log(listRandom)    
  },
  // pegar valor da aposta
  getValorAposta: function() {
    var betValue = $(".game_input_number").val();
    betValue = betValue.replaceAll(",", ".");
    var floatValue = parseFloat(betValue)
    return floatValue;
  },
  // pegar valor do saldo atual
  getSaldo: function() {
    var saldoAtual = $(".input_clean_saldo").val();
    saldoAtual = saldoAtual.replaceAll(",", ".");
    var floatSaldo = parseFloat(saldoAtual);
    return floatSaldo;
  },
  // subtrair saldo atual pelo valor da aposta
  subSaldo: function() {
    var saldo = Mines.getSaldo();
    var valorAposta = Mines.getValorAposta();
    var saldoFinal = saldo - valorAposta;
    
    $(".input_clean_saldo").val(Mines.getFormatterPtBr(saldoFinal))
  },

  // Função para inserção das minas de acordo com a posição que a listam randomica devolver
  verifyBombs: function(value) {
    if (this.listRandomBombs.length > 0) {
      var isBomb = false;
      $("#telha_".concat(value)).addClass("svg_diamond");
      $("#telha_".concat(value)).css("pointer-events","none"); // proibir que clique novamente na mesma telha
      
      Mines.listRandomBombs.forEach(rv => {
        if (rv === Number(value)) {
          isBomb = true;
          $("#telha_".concat(value)).removeClass("svg_diamond");
          $("#telha_".concat(value)).addClass("svg_bomb");
          $(".classeNova").css("pointer-events","none");
          setTimeout(() => {
            $('.modal').modal('show');
            $(".classeNova").css("pointer-events","none");
          }, 100);
        }
      });
      // Se não for bomba ↓
      if (!isBomb) {
        Mines.gemasAtual();
        Mines.percentMines();
        Mines.openTiles();
      }

    } else {
      console.log('O jogo não foi iniciado ainda');
    }
  },
  // botão SIM modal
  buttonYes: function() {
    // limpar lista randomica para repetir o jogo:
    Mines.clearToPlayAgain()
    // fechar modal
    $('.modal').modal('hide');
    // resetar as informações do jogo
    $("#restgemas").prop('value', '0');
    $("#percentMine").prop('value', '0%');
    $("#openTiles").prop('value', '0/25');
    // limpar campo de jogo
    Mines.blockTable();
    // bloquear ou liberar clique
    $(".classeNova").css("pointer-events","none");
    $(".game_config_btn").css("pointer-events","auto");
    $(".game_input_wrapper").css("pointer-events","auto");
    $(".game_bet_config_btn").css("pointer-events","auto");
    $("#normal").css("pointer-events","auto");
    $("#auto").css("pointer-events","auto");
  },
  // botão NÃO modal
  buttonNo: function() {
    console.log('Reiniciar a página');
    window.location.reload(true);
  },
 

/*-------------------------------------*/
// Informações de jogo

gemasRestantes: function() {

  var minas = Mines.getIntValue();
  var totalGemas = 25 - minas;
  var totalIntGemas = parseInt(totalGemas);
  $("#restgemas").val(totalIntGemas);
  return totalIntGemas;
},
gemasAtual: function() {
  var gemas = $("#restgemas").val();
  var intGemas = parseInt(gemas);
  var restGemas = gemas - 1;
  $("#restgemas").val(restGemas);
},

percentMines: function() {
  var qntGemas = $("#restgemas").val();
  var intQntGemas = parseInt(qntGemas);
  var divBy = 25;
  var percentGemas = (qntGemas * 100) / divBy;
  var percentMines = 100 - percentGemas;
  $("#percentMine").val(percentMines + "%");

},

openTiles: function() {

  var total = 25;
  var qntGemas = $("#restgemas").val()
  var intQntGemas = parseInt(qntGemas);
  var qntMines = $("#mines").val()
  var intQntMines = parseInt(qntMines);

  var soma = intQntGemas + intQntMines;
  var open = total - soma; 
  $("#openTiles").val(open + "/25");
},
/*-------------------------------------*/
// Fim informações de jogo
 
// Multiplicador de acertos

addQntMult: function() {
  var qnt = $("#restgemas").val()
  console.log(qnt);
  

  var container = $(".game_bet_item_text");
},

addDiv: function(position) {

  container = $(".game_bet_inner_container"); 

  let newDiv = '<div class="game_bet_item dinamic" ';
  newDiv += '     style="min-width: 78px; height: 100%;">';
  newDiv += '     <div class="game_bet_item_text" ';
  newDiv += '     style="justify-content: center; display: flex; align-items: center;">';
  newDiv += Mines.getValueMultiple(position);
  newDiv += '   </div></div>';
  // ↑ Insere um conteúdo dentro da nova div
  container.append(newDiv); // Adiciona ao final da div o novo conteúdo
},

getValueMultiple: function(position) {

  return 'x' + ((position * 0.5) * (Number($('#mines').val())));
},

removeDiv: function() {
  $(".dinamic").remove(); 
    
},

addMultiple: function() {
  Mines.removeDiv();

  var qntGemas = $("#restgemas").val();
  console.log(qntGemas);

  for (i = 1; i <= qntGemas; i++) {
    Mines.addDiv(i);
  }

},

/*-------------------------------------*/
// Adicionar saldo

calc: function() {
  var cotacao = $(".game_bet_item_text").html();
  var cotacaoval = cotacao.replace("x", "");
  cotacaoval = parseFloat(cotacaoval);

  var betvalue = Mines.getValorAposta();
  console.log(betvalue);

  var premio = cotacaoval * betvalue;
  // premio = premio.toFixed(2);
  var premioFloat = parseFloat(premio);
  console.log(premioFloat);

  const premioatual = premioFloat;
  console.log(premioatual);
  // var premiofinal = premioatual + premioFloat;
  // console.log(premiofinal);
},

somSaldo: function() {

},

removeFirst: function() {
  var divs = $(".dinamic");
  var qnt = divs.length;
  console.log(qnt);

  if (qnt > 1) {
    $(".dinamic")[0].remove();
  }
},

listPremio: function() {

}

/*--------------------------------------------------------------------------*/
}