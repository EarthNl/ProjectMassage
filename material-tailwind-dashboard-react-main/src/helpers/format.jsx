

//-----------------------------------------------------------------------------------------
//date
//-----------------------------------------------------------------------------------------
export const toThaiDateTimeString = (date) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:"numeric",
    minute:'numeric',
    second:"numeric",
    timeZone: "UTC",
    formatMatcher:'basic',
  })
 return datetoThai
};

export const toThaiDateString = (date) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    formatMatcher:'basic',
  })
 return datetoThai
};
//-----------------------------------------------------------------------------------------
//number
//-----------------------------------------------------------------------------------------
export const currencyFormat = (num)=> {
    return num?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
//-----------------------------------------------------------------------------------------
//word
//-----------------------------------------------------------------------------------------
  export const lengthTextFormat = (text, maxText) => {
    return text?.length > maxText
      ? text.substring(0, maxText - 3) + "..."
      : text;
      
}

export const inputLengthThailand = (e) => {
  return e.target.value.replace(/[^ก-๛']/g, '')
    
}

export const inputLengthEnglish = (e) => {
  return e.target.value.replace(/[^a-zA-Z0-9']/g, '')
    
}

export const inputEnglishUppercase = (e) => {
  return e.target.value.replace(/[^A-Z0-9']/g, '') 
}

export const inputNumber = (e) => {
  return e.target.value.replace(/[^0-9']/g, '') 
}
