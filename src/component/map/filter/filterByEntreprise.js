export const filterByEntreprise = (props,JobLoc) =>{
///ATTENTION LE MAL DE CRANE VA ARRIVER!!!

    const JobByEntreprise = { Noncomuniquer: { Offre: [] }};
    props.data.forEach((el) => {
      if (el.entreprise.nom !== undefined) {
        if (JobByEntreprise[el.entreprise.nom] === undefined) {
          let loc = [];
          JobLoc.forEach((entreprise) => {
            if (entreprise.parameters.q == el.entreprise.nom) {
              loc = entreprise.records.filter(
                (param) => param.fields.etatadministratifetablissement !== "Fermé"
              );
            }
          });
  
          let LocRecents = null
          if(loc.length > 1){
            const temp = loc.reduce((a, b) => {
              if (a.fields !== undefined) {
                return new Date(a.fields.datedebutetablissement) >
                  new Date(b.fields.datedebutetablissement)
                  ? a
                  : b;
              }
            });
            LocRecents = temp.geometry.coordinates;
            
            
          }else{
            LocRecents = [
              el.lieuTravail.latitude,
              el.lieuTravail.longitude,
            ]
          }
            



                Object.defineProperty(JobByEntreprise, el.entreprise.nom, {
                  value: { Offre: [el], Loc: LocRecents },
                  writable: true,
                  enumerable: true,
                  configurable: true,
                });
                

  
          
        } else {
          JobByEntreprise[el.entreprise.nom].Offre.push(el);
        }
      } else {
        JobByEntreprise.Noncomuniquer.Offre.push(el);
      }
    });
      const list = [];
      const listNoLocation = []
/*;
  
    for (const [key, value] of Object.entries(JobByEntreprise)) {
      let loc = [0, 0];
      try {
        loc = value.Loc.geometry.coordinates;
      } catch (error) {
        loc = value.Loc;
      }
      
    } */


    for (const [name, data] of Object.entries(JobByEntreprise)) {
      if(name !== 'Noncomuniquer'){
       if(data.Loc[0] !== undefined){
        if(data.Loc[0] > 1 && data.Loc[0] < 3){
          const [a,b] = data.Loc;
          data.Loc = [b,a]
          list.push([name, data]);
        }else{
          const [a,b] = data.Loc;
          data.Loc = [b,a]
          listNoLocation.push([name, data])
  
        }
       }

       
      }else{
        list.push([name, data]);
      }
      
    }
    list.push(["NoLocation",listNoLocation])
    //console.log(JobByEntreprise,list)
    return list
}