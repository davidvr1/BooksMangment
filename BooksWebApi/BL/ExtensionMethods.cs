using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class ExtensionMethods
    {
        public static int CountLetters(this string phrase)
        {
            return phrase.Length;
        }
    }
}
