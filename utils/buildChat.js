function buildChat(msgObj) {
  const FormattedDate = new Date(msgObj.date).toLocaleString();
  const chatHtml = `<li>
  <div class="user-image">
    <img
      src="${msgObj.avatar}"
    />
  </div>
  <div class="user-message">
    <div class="user-name-time ft-bld">${msgObj.username} <span class="ft-normal">${FormattedDate}</span> </div>
    <div class="message-text">
      ${msgObj.data}
    </div>
  </div>
</li>`;

  return chatHtml;
}
