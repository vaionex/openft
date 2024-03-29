import Link from 'next/link'
import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { removeQuery } from '@/redux/slices/nft'

const ActiveLink = ({
  children,
  activatedonLinks,
  activeClassName,
  ...props
}) => {
  const router = useRouter()
  const { asPath, pathname } = router
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(removeQuery({}))
    router.push(props?.href)
  }

  const child = Children.only(children)

  const childClassName = child.props.className || ''

  let className =
    asPath === props.href ||
    pathname === props.href ||
    asPath === props.as ||
    asPath.includes(activatedonLinks)
      ? twMerge(childClassName, activeClassName)
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
        onClick: handleClick,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.object,
  ...{
    href: PropTypes.string.isRequired,
    activeClassName: PropTypes.string,
  },
}

export default ActiveLink
