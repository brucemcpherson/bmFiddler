const Utils = (()=>{

  const removeUndef = (ob) => Object.keys(ob || {}).reduce((p,c)=>{
    if(typeof ob[c] !== typeof undefined) p[c] = ob[c]
    return p;
  },{})

  const validateOptions = ({opts, options , thisOptions}) => {
    const bad = Object.keys(options).filter(f => !opts.has(f))
    if (bad.length) throw new Error(`bad options ${bad.join(',')}`)

    return {
      ...Array.from(opts.keys()).reduce((p, c) => { p[c] = opts.get(c); return p }, {}),
      ...removeUndef (thisOptions),
      ...removeUndef (options),
    }
  }
    /**
   * generate a unique id
   * @param {number} [length=4] size of random piece
   * @return {string} a unique string
   */
  const generateUniqueString = (length = 4) => {
    const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const arbitraryString = ([...Array(length)].map(() => String.fromCharCode(randBetween(97, 122)))).join('')
    return arbitraryString + new Date().getTime().toString(32);
  };

 const obfuscate = ({id, salt}) => Utilities.computeDigest(Utilities.DigestAlgorithm.MD2, id + salt);

  const runner = ({action, failSilently}) => {
    try {
      return action () 
    } catch (err) {
      if (failSilently) return null
      throw new Error(err)
    }
  }
  return {
    validateOptions,
    generateUniqueString,
    removeUndef,
    runner,
    obfuscate
  }
})()
