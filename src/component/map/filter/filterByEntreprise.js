export const filterByEntreprise = (props,JobLoc) =>{

    const JobByEntreprise = { Noncomuniquer: { Offre: [] } };
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
  
          let LocRecents =
            loc.length > 1
              ? loc.reduce((a, b) => {
                  if (a.fields !== undefined) {
                    return new Date(a.fields.datedebutetablissement) >
                      new Date(b.fields.datedebutetablissement)
                      ? a
                      : b;
                  }
                })
              : {
                  geometry: {
                    coordinates: loc[0] || [
                      el.lieuTravail.latitude,
                      el.lieuTravail.longitude,
                    ],
                  },
                };
  
          Object.defineProperty(JobByEntreprise, el.entreprise.nom, {
            value: { Offre: [el], Loc: LocRecents.geometry.coordinates },
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
  
    /*  if(value.length > 0){
    list.push(value)
    
  }
   */
  
    for (const [key, value] of Object.entries(JobByEntreprise)) {
      let loc = [0, 0];
      try {
        loc = value.Loc.geometry.coordinates;
      } catch (error) {
        loc = value.Loc;
      }
      list.push([key, value]);
    }

    return list
}