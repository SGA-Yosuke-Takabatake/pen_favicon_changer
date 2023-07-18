var defaultaccountname = "-dev$";

function saveAccountName() {
  var account_name = document.getElementById("inputaccountname").value;

  chrome.storage.local.set({ target_account_name: account_name }, function () {});
  document.getElementById("mescolors").innerHTML = "saved.";
}

function load() {
  chrome.storage.local.get("target_account_name", function (items) {
    var value;
    if (!items.target_account_name) {
      value = defaultaccountname;
    } else {
      value = items.target_account_name;
    }
    document.getElementById("inputaccountname").value = value;
  });
}

document.addEventListener("DOMContentLoaded", load);
document.getElementById("savebuttonaccountname").addEventListener("click", saveAccountName);
