export const myInitialData = {
    token:'',    
}

export const getInitState = () => {
    const lc_store = localStorage.getItem('reduxV5Test');
    return lc_store ? JSON.parse(lc_store): myInitialData;
  };