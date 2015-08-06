////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------------------- //
//                                                                            //
//                       (C) 2010-2015 Robot Developers                       //
//                       See LICENSE for licensing info                       //
//                                                                            //
// -------------------------------------------------------------------------- //
////////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------//
// Prefaces                                                                   //
//----------------------------------------------------------------------------//

#include "Size.h"
#include "Point.h"
ROBOT_NS_BEGIN



//----------------------------------------------------------------------------//
// Constructors                                                          Size //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

Size::Size (int32 value)
{
	W = value;
	H = value;
}

////////////////////////////////////////////////////////////////////////////////

Size::Size (int32 w, int32 h)
{
	W = w;
	H = h;
}



//----------------------------------------------------------------------------//
// Functions                                                             Size //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

bool Size::IsEmpty (void) const
{
	return W == 0 && H == 0;
}

////////////////////////////////////////////////////////////////////////////////

Point Size::ToPoint (void) const
{
	return Point (W, H);
}



//----------------------------------------------------------------------------//
// Operators                                                             Size //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

Size& Size::operator += (const Size& size)
{
	W += size.W;
	H += size.H;
	return *this;
}

////////////////////////////////////////////////////////////////////////////////

Size& Size::operator -= (const Size& size)
{
	W -= size.W;
	H -= size.H;
	return *this;
}

////////////////////////////////////////////////////////////////////////////////

Size Size::operator + (const Size& size) const
{
	return Size (W + size.W, H + size.H);
}

////////////////////////////////////////////////////////////////////////////////

Size Size::operator - (const Size& size) const
{
	return Size (W - size.W, H - size.H);
}

////////////////////////////////////////////////////////////////////////////////

bool Size::operator == (const Size& size) const
{
	return W == size.W && H == size.H;
}

////////////////////////////////////////////////////////////////////////////////

bool Size::operator != (const Size& size) const
{
	return W != size.W || H != size.H;
}

ROBOT_NS_END