
Handlebars.templates = {};

// Wrapper function to make promises work better with jquery
function loadTemplate(name) {
  return new Promise(function(resolve, reject) {
    $.get("handlebars/" + name + ".handlebars",(data) => {
      Handlebars.templates[name] = Handlebars.compile(data);
    })
      .done(resolve)
      .fail(reject);
  });
}

// Wrapper function to make promises work better with jquery
function loadPartial(name) {
  return new Promise(function(resolve, reject) {
    $.get("handlebars/" + name + ".handlebars",(data) => {
      Handlebars.registerPartial(name, data);
    })
      .done(resolve)
      .fail(reject);
  });
}

// Load in templates from .handlebars files
function loadTemplates()
{
  return new Promise((resolve, reject) => {
    Promise.all([
      loadTemplate("pageIndex"),
      loadTemplate("pageOverview"),
      loadPartial("itemOverview"),
      loadPartial("itemStationSummary"),
      loadPartial("paginator")
    ])
    .then(resolve);
  });
}