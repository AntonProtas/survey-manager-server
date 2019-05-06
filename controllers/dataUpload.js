const User = require('../models/user');
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');

exports.uploadDataJson = async ctx => {
  const users = await User.find({}).sort('registrationDate');
  console.log(JSON.stringify(users, null, 4));
  fs.writeFile('users-data.json', JSON.stringify(users, null, 4), function(
    err
  ) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
  ctx.status = 200;
};

exports.uploadDataDocx = async ctx => {
  const users = await User.find({}).sort('registrationDate');
  const doc = new Document();
  users.map(user => {
    const paragraph1 = new Paragraph(`id - ${user._id} `);
    doc.addParagraph(paragraph1);
    const paragraph2 = new Paragraph(`username - ${user.username} `);
    doc.addParagraph(paragraph2);
    const paragraph3 = new Paragraph(`email - ${user.email} `);
    doc.addParagraph(paragraph3);
    const paragraph4 = new Paragraph(`password - ${user.password} `);
    doc.addParagraph(paragraph4);
    const paragraph5 = new Paragraph(`role - ${user.role} `);
    doc.addParagraph(paragraph5);
    const paragraph6 = new Paragraph(
      `registrationDate - ${user.registrationDate} `
    );
    doc.addParagraph(paragraph6);
    const paragraph7 = new Paragraph(`---------------------------- `);
    doc.addParagraph(paragraph7);
  });

  const packer = new Packer();
  packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('users-data.docx', buffer);
  });
  ctx.status = 200;
};
