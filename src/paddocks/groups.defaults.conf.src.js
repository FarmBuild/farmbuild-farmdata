angular.module('farmbuild.farmdata').
  constant('paddockGroupDefaults', {
      "groups": [
          {name:'N/A - Type Not Set', paddocks:[]},
          {name:'E - Effluent', paddocks:[]},
          {name:'N - Night Paddocks', paddocks:[]},
          {name:'A - Average Use and Soil Type Paddock', paddocks:[]},
          {name:'UL - Usually Harvested, Limited Feeding Back', paddocks:[]},
          {name:'UF - Usually Harvested, Usually Fed Back', paddocks:[]},
          {name:'NL - Never Harvested and Limited Feeding Back', paddocks:[]},
          {name:'NF - Never Harvested and Usually Fed Back', paddocks:[]},
          {name:'NL1 - 1st Variation of NL', paddocks:[]},
          {name:'NL2 - 2nd Variation of NL', paddocks:[]},
          {name:'NF1 - 1st Variation of NF', paddocks:[]},
          {name:'NF2 - 2nd Variation of NF', paddocks:[]},
          {name:'UL1 - 1st Variation of UL', paddocks:[]},
          {name:'UF1 - 1st Variation of UF', paddocks:[]},
          {name:'C - Crop', paddocks:[]},
          {name:'FC - Future Crop', paddocks:[]},
          {name:'O - Other', paddocks:[]},
          {name:'O1 - 1st Variation of O', paddocks:[]}
      ]
  });