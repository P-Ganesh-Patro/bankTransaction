"use strict";

const acc1 = {
  Name: "P Chandu",
  Transaction: [100, 200, -20, 500, 300, 900, 400, 100, 20, -30],
  interrate: 1.2,
  pin: 93988,
  address: "Vizag",
};
const acc2 = {
  Name: "S suresh",
  Transaction: [20, 30, 80, -20, 50, 50, 70, -80, 30, -20],
  interrate: 1.3,
  pin: 1111,
  address: "Rayagada",
};
const acc3 = {
  Name: "k Harish",
  Transaction: [20, 30, 40, -50, 60, 80, -70, -60, 42, 82],
  interrate: 1.4,
  pin: 3333,
  address: "Dusi",
};
const acc4 = {
  Name: "B Lokesh",
  Transaction: [20, 30, 80, -20, 50, 50, 70, -80, 30, -20],
  interrate: 1.5,
  pin: 4444,
  address: "Kotturu",
};
const acc5 = {
  Name: "K Sai kiran",
  Transaction: [20, 30, 40, -50, 60, 80, -70, -60, 42, 82],
  interrate: 1.6,
  pin: 5555,
  address: "Ponduru",
};

const accs = [acc1, acc2, acc3, acc4, acc5];
// console.log(accs);

const trans_statements = document.querySelector(".trns");
const depo = document.querySelector(".deposit_money");
const withd = document.querySelector(".withdraw_money");
const cr_bl = document.querySelector(".current_balance");
const lg_btn = document.querySelector(".login_button");
const una = document.querySelector(".username");
const pw = document.querySelector(".userpass");
let welcm = document.querySelector(".wel_c");
let app = document.querySelector(".app");
let total_D = document.querySelector(".total_depo");
const total_W = document.querySelector(".total_with");
const tranfer_btn = document.querySelector(".transfer_amount_btn");
const money_trs_to = document.querySelector(".money_trans_id");
const money_trs_am = document.querySelector(".money_trans_amount");
let app1 = document.querySelector(".app1");
let int_rest = document.querySelector(".Interest");
let loan_input = document.querySelector(".loan_input");
let loan_btn = document.querySelector(".loan_button");
const delt_btn = document.querySelector(".account_Delet_btn");
const dle_user_id = document.querySelector(".del_user_input");
const dle_user_pw = document.querySelector(".del_user_pws");


//create userid
const createUserName = function (UN) {
  UN.forEach(function (acc) {
    acc.userid = acc.Name.toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");

  })
  UN.forEach(function(acc){
    acc.balance = acc.Transaction.reduce(function (accu, cur) {
      accu = accu + cur;
      return accu;
    }, 0);
   
})
}
createUserName(accs);

//Display the current balnace

const stateMents = function (accT) {
   let accTr = accT.reduce(function (accu, cur) {
    accu = accu + cur;
    return accu;
  }, 0);
  cr_bl.innerHTML = accTr;
  
};

//display the transaction
const displayStatements = function (AT) {
  welcm.innerHTML = `Welcome Mr ${AT.Name}`;
  trans_statements.innerHTML = "";
  // AT.balance = accTr;
  AT.Transaction.map(function (num, i) {
    const type = num > 0 ? "deposit" : "withdraw";
    const html = `<div class="trancaction_details_depo info_of_trans">
  <p class="index">${i + 1}</p>
  <h3 class="${type}_money deposit">${type}</h3>
  <h2 class="balance">${num}</h2>
</div>`;
    trans_statements.insertAdjacentHTML("afterbegin", html);

    let totalDe = AT.Transaction.filter((num) => num > 0).reduce(
      (accu, cur) => accu + cur
    );
    let totalWi = AT.Transaction.filter((num) => num < 0).reduce(
      (accu, cur) => accu + cur
    );
    total_D.innerHTML = totalDe;
    total_W.innerHTML = `${Math.abs(totalWi)}`;

    let interest = AT.Transaction.filter((num) => num > 0).reduce(
      (accu, cur) => accu +  AT.interrate / 100,0
    );
    int_rest.innerHTML = interest;
  });
};

let current_account ;
lg_btn.addEventListener("click", function (e) {
  e.preventDefault();
current_account = accs.find(account => account.userid === una.value);
// console.log(current_account)
  accs.forEach(function (acc)
   {
    if (acc.userid === una.value && acc.pin === Number(pw.value)) {
      app1.style.opacity = 100;
      stateMents(acc.Transaction);
      displayStatements(acc);

      una.value = "";
      pw.value = "";
    }
  });
});


tranfer_btn.addEventListener('click',function(){
  let tTO = money_trs_to.value;
  let tAM = Number(money_trs_am.value);
  let verifyid= accs.find(account => account.userid === tTO);
  if(verifyid?.userid === tTO && verifyid.balance > tAM ) {
    current_account.Transaction.push(-tAM);
     verifyid.Transaction.push(tAM);
     displayStatements(current_account);

    money_trs_to.value = '';
    money_trs_am.value = '';

  }
  
  })
  
  loan_btn.addEventListener('click', function(){
    // console.log(loan_input.value);
    if(loan_input.value > 0 && current_account.Transaction.some(acco => acco > 0)){
      current_account.Transaction.push(loan_input.value);
     displayStatements(current_account);
    }
  })

  delt_btn.addEventListener('click', function(){
    let dui = dle_user_id.value;
    let dup = Number(dle_user_pw.value);
if(current_account.userid === dui && current_account.pin === dup){
  // console.log(accs.current_account);
  const index = accs.findIndex(acco => acco.userid === current_account.userid);
  // console.log(index);
  accs.splice(index, 1);
  app1.style.opacity = 0;
}
  })