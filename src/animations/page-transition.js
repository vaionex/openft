const pageTransitionVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.5,
    },
  },
}

export default pageTransitionVariants
