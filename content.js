const defaultaccountname = "-dev$";

const changeFavicon = () => {
  const iconurl = chrome.runtime.getURL("icons/favicon.ico");
  const linkEle = document.querySelector('link[rel*="icon"]');

  if(linkEle) {
    linkEle.href = iconurl;
  } else {
    const linkInnerHtml = '<link type="image/x-icon" rel="icon" href="' + iconurl +  '">';
    document.querySelector('head').insertAdjacentHTML('afterBegin', linkInnerHtml);
  }
}

const getAWSAccountAlias = () => {
   const userInfoString = document.cookie
    .split('; ')
    .find(row => row.startsWith('aws-userInfo'))
    .split('=')[1];

  const userInfo = JSON.parse(decodeURIComponent(userInfoString));
  const accountAlias = decodeURIComponent(userInfo.alias); 

  return accountAlias;
}

window.addEventListener("load", function () {
  const accountAlias = getAWSAccountAlias();
  var accountName = defaultaccountname;
  chrome.storage.local.get("target_account_name", function (items) {
    if (items.target_account_name) {
      accountName = items.target_account_name;
    }
    const re = new RegExp(accountName);
    if (re.test(accountAlias)) {
      changeFavicon();
    }
  });
});
