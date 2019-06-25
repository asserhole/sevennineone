<template>
    <div id="a-merchant">
        <div class="a-merchant_bg clearfix">
            <div class="a-merchant_banner" :style="'background-image:url('+merchant.banner+');'">
                <span @click="$router.push({name:'activity-aid-merchant-mid-image',params:{aid:aid,mid:mid}})" class="a-merchant_more">
                    查看图集&nbsp;>
                </span>
            </div>

            <div class="a-merchant_content">
                <div class="a-merchant-title">
                    <div>
                        <p class="a-merchant_content_name">
                            <!--<img :src="merchant.logo" />-->
                            {{merchant.name}}
                        </p>
                        <p class="a-merchant_gray">“{{merchant.description}}”</p>
                    </div>
                    <a class="a-merchant_title_phone" href="tel:15311480726">
                        <svg width="106px" height="109px" viewBox="0 0 106 109" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 52.4 (67378) - http://www.bohemiancoding.com/sketch -->
                            <title>dianhua</title>
                            <desc>Created with Sketch.</desc>
                            <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="图标库5" transform="translate(-877.000000, -18.000000)">
                                    <image id="dianhua" x="877" y="18" width="106" height="109"
                                           xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABaCAYAAAA8XZE/AAAMKGlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUk8kWgOcvqSS0QASkhN5EKdKl1wgCUgUbIQkklBASgoodWVRwLaiIYEVXRBRdCyCLDXtZBHt/oKKirIsFGypvkgC6et57591z5v+/3Llz596b+efMAKAWxRGLM1F1ALJEuZLoEH/WpMQkFukhwIEGoAAToMLhSsV+UVHhAMrQ+5/y7gZA5O+rdnJfP/f/V9Hg8aVcAJAoyCk8KTcL8kEAcBeuWJILAKEH6k1n5IohE2GUQEsCA4RsJuc0JbvJOUXJ4Qqb2OgAyMkAkGkcjiQNAFV5XKw8bhr0o7oMsr2IJxRBbobszRVweJA/Qx6VlZUNWc0KslXKd37S/uEzZdgnh5M2zMpcFEIOFErFmZxZ/2c5/rdkZcqG5jCFjSaQhEbLc5bXLSM7TM40yOdEKRGRkDUhXxPyFPZyfiKQhcYN2n/gSgNgzQATAJTG4wSGQdaHbCLKjAgf1HunCoPZkGHt0VhhLjtWORblSbKjB/2jM/nSoJgh5kgUc8ltimUZcX6DPjcJ+Owhn035gtgEZZxoW54wPgKyKuR70oyYsEGb5/mCgIghG4ksWh4z/M8xkCoJjlbaYGZZ0qG8MA+BkB0xyOG5gthQ5VhsGpejiE0HcjpfOil8KE4ePzBImRdWwBfFDcaPlYpz/aMH7beLM6MG7bFmfmaIXG8CuVWaFzM0tjcXLjZlvjgQ50bFKmPDtdI546OUMeA2IBwEgEDAAjLYUkA2SAfC1p6GHvhL2RMMOEAC0gAf2A1qhkYkKHpE8BkD8sFfkPhAOjzOX9HLB3lQ/2VYq3zagVRFb55iRAZ4AjkLhIFM+FumGCUani0ePIYa4U+zc2GsmbDJ+37SsdSGdMQgYiAxlBhMtMb1cG/cEw+HT1/YHHE33H0orm/2hCeEdsJDwnVCB+H2dGGB5IfIWWAC6IAxBg9ml/J9drgF9OqM++Ne0D/0jTNxPWCHj4Uz+eE+cG5nqP0+Vtlwxt9qOeiLYk9BKSMovhSrHyNQtVF1HvYir9T3tVDGlTJcrYDhnh/zCPiufjz4DvvREluCHcDOYiew81gz1gBY2DGsEbuEHZHz8Np4rFgbQ7NFK+LJgH6EP83HGZxTXjWpfa19t/3nwT6Qy5+ZK/9YArLFsyTCNEEuyw/u1nwWW8QdPYrlaO8Ad1H53q/cWt4wFXs6wrzwTZdzHAD3YqhM+6bjwD3o8BMAGO++6Uxfw2W/EoAjbVyZJE+pw+UPAqACNfil6AJDuHdZwYwcgQvwBL4gCIwHkSAWJIJpsM4CuE4lYAaYAxaCIlACVoK1oAJsBtvATrAH7AcNoBmcAGfARdAGroO7cK10gRegF7wD/QiCkBA6wkB0ESPEHLFFHBE3xBsJQsKRaCQRSUbSEBEiQ+Ygi5ASpBSpQLYiNcjvyGHkBHIeaUduI51IN/Ia+YRiKA3VQg1QC3QM6ob6oWFoLDoVTUNz0Hy0EF2OlqNV6G60Hj2BXkSvox3oC7QPA5gKxsSMMTvMDQvAIrEkLBWTYPOwYqwMq8LqsCb4T1/FOrAe7CNOxBk4C7eD6zUUj8O5eA4+D1+GV+A78Xr8FH4V78R78a8EOkGfYEvwILAJkwhphBmEIkIZYQfhEOE0/Ha6CO+IRCKTaEl0hd9eIjGdOJu4jLiRuJd4nNhOfETsI5FIuiRbkhcpksQh5ZKKSOtJu0nHSFdIXaQPZBWyEdmRHExOIovIBeQy8i7yUfIV8lNyP0WdYk7xoERSeJRZlBWU7ZQmymVKF6WfqkG1pHpRY6np1IXUcmod9TT1HvWNioqKiYq7ykQVocoClXKVfSrnVDpVPtI0aTa0ANoUmoy2nFZNO067TXtDp9Mt6L70JHoufTm9hn6S/oD+QZWhOlqVrcpTna9aqVqvekX1pRpFzVzNT22aWr5amdoBtctqPeoUdQv1AHWO+jz1SvXD6jfV+zQYGg4akRpZGss0dmmc13imSdK00AzS5GkWam7TPKn5iIExTBkBDC5jEWM74zSjS4uoZanF1krXKtHao9Wq1autqT1WO157pnal9hHtDibGtGCymZnMFcz9zBvMTyMMRviN4I9YOqJuxJUR73VG6vjq8HWKdfbqXNf5pMvSDdLN0F2l26B7Xw/Xs9GbqDdDb5Peab2ekVojPUdyRxaP3D/yjj6qb6MfrT9bf5v+Jf0+A0ODEAOxwXqDkwY9hkxDX8N0wzWGRw27jRhG3kZCozVGx4yes7RZfqxMVjnrFKvXWN841FhmvNW41bjfxNIkzqTAZK/JfVOqqZtpquka0xbTXjMjswlmc8xqze6YU8zdzAXm68zPmr+3sLRIsFhs0WDxzFLHkm2Zb1lrec+KbuVjlWNVZXXNmmjtZp1hvdG6zQa1cbYR2FTaXLZFbV1shbYbbdtHEUa5jxKNqhp1045m52eXZ1dr1zmaOTp8dMHohtEvx5iNSRqzaszZMV/tne0z7bfb33XQdBjvUODQ5PDa0caR61jpeM2J7hTsNN+p0enVWNux/LGbxt5yZjhPcF7s3OL8xcXVReJS59Ltauaa7LrB9aablluU2zK3c+4Ed3/3+e7N7h89XDxyPfZ7/O1p55nhucvz2TjLcfxx28c98jLx4nht9erwZnkne2/x7vAx9uH4VPk89DX15fnu8H3qZ+2X7rfb76W/vb/E/5D/+wCPgLkBxwOxwJDA4sDWIM2guKCKoAfBJsFpwbXBvSHOIbNDjocSQsNCV4XeZBuwuewadu941/Fzx58Ko4XFhFWEPQy3CZeEN01AJ4yfsHrCvQjzCFFEQySIZEeujrwfZRmVE/XHROLEqImVE59EO0TPiT4bw4iZHrMr5l2sf+yK2LtxVnGyuJZ4tfgp8TXx7xMCE0oTOiaNmTR30sVEvURhYmMSKSk+aUdS3+SgyWsnd01xnlI05cZUy6kzp56fpjctc9qR6WrTOdMPJBOSE5J3JX/mRHKqOH0p7JQNKb3cAO467gueL28Nr5vvxS/lP031Si1NfZbmlbY6rVvgIygT9AgDhBXCV+mh6ZvT32dEZlRnDGQmZO7NImclZx0WaYoyRKeyDbNnZreLbcVF4o4cj5y1Ob2SMMkOKSKdKm3M1YKH7EsyK9kvss4877zKvA8z4mccmKkxUzTz0iybWUtnPc0Pzv9tNj6bO7tljvGchXM65/rN3ToPmZcyr2W+6fzC+V0LQhbsXEhdmLHwzwL7gtKCt4sSFjUVGhQuKHz0S8gvtUWqRZKim4s9F29egi8RLmld6rR0/dKvxbziCyX2JWUln5dxl1341eHX8l8Hlqcub13hsmLTSuJK0cobq3xW7SzVKM0vfbR6wur6Naw1xWverp2+9nzZ2LLN66jrZOs6ysPLG9ebrV+5/nOFoOJ6pX/l3g36G5ZueL+Rt/HKJt9NdZsNNpds/rRFuOXW1pCt9VUWVWXbiNvytj3ZHr/97G9uv9Xs0NtRsuNLtai6Y2f0zlM1rjU1u/R3rahFa2W13bun7G7bE7insc6ubute5t6SfWCfbN/z35N/v7E/bH/LAbcDdQfND244xDhUXI/Uz6rvbRA0dDQmNrYfHn+4pcmz6dAfo/+objZurjyifWTFUerRwqMDx/KP9R0XH+85kXbiUcv0lrsnJ528dmriqdbTYafPnQk+c/Ks39lj57zONZ/3OH/4gtuFhosuF+svOV869Kfzn4daXVrrL7tebmxzb2tqH9d+9IrPlRNXA6+euca+dvF6xPX2G3E3bt2ccrPjFu/Ws9uZt1/dybvTf3fBPcK94vvq98se6D+o+pf1v/Z2uHQc6QzsvPQw5uHdR9xHLx5LH3/uKnxCf1L21OhpzTPHZ83dwd1tzyc/73ohftHfU/SXxl8bXlq9PPi379+Xeif1dr2SvBp4veyN7pvqt2PftvRF9T14l/Wu/33xB90POz+6fTz7KeHT0/4Zn0mfy79Yf2n6Gvb13kDWwICYI+EojgIYbGhqKgCvqwGgJ8KzQxsA1MnKu5lCEOV9UkHgP7Hy/qYQFwCqfQGIWwBAODyjbILNHDINvuVH8FhfgDo5DbdBkaY6OSp90eCNhfBhYOCNAQCkJgC+SAYG+jcODHzZDoO9DcDxHOWdUC7yO+gWGzldHqe7APwg/wZ0EnAo2D12cgAALS1JREFUeAHtnXeXnclxn+vmyZgcEBe7JEiRXIqkwpElW+dI8gfwt/UftvSHLdmWTS2DKJK73F1kTMDkcGfmRj9PvfcOBsAMgMVyJPIc9eC9b+pQ/avq6urq7helPiH+PVwZAuUry/nfM04EqleBg01ieJQGBSQnz7eV3iCSETj6ROgP/kxSXOcrb4lSikpe8WM+mfH5DIcvi/P5dvla1EzP0/LVy9eVAGwVuxxDHKyGeA6rY+V7A2xKGakPXl5w9AvkuwnpizxK/YSJOMPzID5PMqnnYeBVz8JKxKWwMkeR3jSETCrA5jXML9/81n+uDOALKbUuVE6sWpX+APR+VEC5DLBVjnxKnFpIGgfvZEImTWAGOftAgATPt8kXMx+8B+B+lR8Sd3kp1iYpQpHmxf3w+W//fGUAD4n3bJ2HZy9s/m0q7V+Va6XXo99Xbk1QQsJVCNyBjK3BSzG0GSTOSihXYgyv8n2FCDIjI5LOlmJZMiDPmXnmYuJkYV5c4U/pKqwIK2PlrErWaXgeNNk+ktpRWnk5bKWCW0CBekF/nABwm3beJqNOtxutfgfQlUbyJZ1ZlUlcK1eiXq5Gg5IaJa55L9Dmyz9uABlakollEbeVwEjiVlD8pVJyyphXEq5GgrNCKWxJtIALdmERFpJVBzwr16V+LZA4IsJBux17rZPYP2nGzmknmp1unLY92nHaReZhQup24tspVgS3UomRSi0mqtWYaIzGNY6JRi2mK424Vqsl8EKoFFe7BWHZNuwEeCFNJbl1ReFKAJbclBp+hn2T0ifIvVIPyatEkxctpGn/+DTWjo44DmO9eRTPjw/jsHsa+612tACh20OywaIDuPAp81A0e+gCpVTwKvw2YNZotR7jI40YrY/EXLURKyPjsTg1EfPj4zHVaMQY8UcoV/rIuKARWobhKoC+EhWRlAOGZwG28Xtr4+wAWBPwPu104tk+wG7vxvr+ARJ7DLBdVAOMqJSiXSEVTbqMKSUkpTQ7kDa4ZF6JrEWQa9l3/KMyPKZArmucR0k70xiJW9euxZ1rU3F7fCKuj47FdK0adaKp51VLFVqB4XcI4KxiVk/CvEupGDxOOLkWGOve5WWbZrjT7sTTne14uLMVPzs9idWDozhsHmecXkWVUUVlVKLXo/urdAAY8Mgj9XShY4oOjfJ6Ax0uEwUmy5cOypMMlYnSX0VSpwB6DlBXGuNxd34uPlpcjsWxiZimrCoptWKqZGAufdWWZzIpOuAiPwoh18H14Fyonnx86c97SnA2djL1bKDw1AVQBaISpx3a5VmfzuSIZ6tHx/HTze345dZmPDs6iOPoIM1F+hIIpp1KhQUHhJHQQuqzWvnQn6KSBYje54viua+G8Tir2+0Mlc0K5ZcBukoLmUR9LMzOx62pyfh4GqmeuhZTtJgRYZWx0Nuh0+yh5EdhEOwtWgsAD2ubVg35ql8F+U3hawDceZFvVozapLhygqwTanZK6Qen7fjyOcCuP49f7qIKQKFJymqpU0jmi1wGV+dAe+3duz8Q3CHfaQgp2TLGUFVf8/6jsXp8fP16fGthIZYa9ajJWAUEXS50de7LCg7g9mGCyQXZs4cAv9Dg3FwQvgbA2Z9TEgR4UDKtNq87ELSNsnzU3I/P1p7Gp+vrdGIncYwK6JQgnibbL6NjSXZVYUjWEFR1N6Wm5aEK6rdbUcMyWR5rxLdRGX+4ciNuT07GGKqqDgOsi/Z1qh9aWF+QB8RaTYMAv60K7wWwHUvJXj2LhIfUpofIKMBK7y7E/8v+Znyy+ji+2NqI7U6LkRtjs/JolDuYSzS/ThVJeVv7shbvGQT4fOUF+EXQOsEWL3Wj3u3EDHTfm56N7yHNf7C4EvNYIhXUSXavqq8El9zUfQYv+XkXE+xd4hSZvvKrhrQ4JUR91abQFoDtnp7Gr9fX4v+uPokHzb04JM7pyCgdXdERVVXOcMLKD8h9Jeffzq1q4XywvFQbdooytmIXVo12rZ429y93dmMf2k9a3fjejesxB8gNCHQIX1YRkMGZDMO9cjYNc31zeC+ABUZiZajXXTqkYwBcOzmJf3n2NH725HE8PTmOY4z/XrmWTdPOogJhml4q3/6w7b6Zvq/1Vv0ofYazM2UX2AtSAVmnUYmDTjXuN1vRfPQg9jvt+Pj2zbiDiVeTDdS14tCdCpsPyQa6ObN+4897A2z/qpLIkRilrjFI+CfA/eTZ41g9bUa7OoKqrUNYLxrUSDxVLX0UWytVjNz3uJqQuQ9QVV0Mw9k1dNWhq4Pl0qVvOK5W4hR6mkjx4bNnsdvrxOjyctyYmgJX69pFjrV2Ct2cpJ/Ld5j/q+eLAR4QlpHJpLgdUisHi2sloUVJ60juT58+BeBH8ax9HCd1ZYfOgndlVIJDVF2GHR63IVYtYSu9SiGWwgHFXBUhwfUhdUotodXATY9WpR2e5lm9H5uYZz9DWGYQmso3vxVzDFAaSH66PQd5Kcav5j98NTyL/8UAD2OQQ8HxgcaF62ZbeL2Ux2o8xwz7ZH0jfsyxjs+gA6HVATFle2v+OlTAdFbHylnwVYKb5FOILcyy/Mmyh/ciw5E6mTfIcDTo1LzHGuNciT38IP9zZy+Onz+PP8Z2vol/Y5z6jxQ5Eom6YQ2lvrCMS8KFAJ9xRjYTkjgVLld6woSKcRa6qhWfbmzFT9C5q0hxr1qDQHpfDfT0HQArBDuSMzWnvEjb0usrDFmHQbnDYl5lai97O6QZeouqnlEZ3Uo9VqH6/zxbjXq9HqNLy3juGIIjuVUYYFB1DPEelnH+bH0vBvgVwkQnQS6QxmIoxz5Af7b1PP7l8cPY2T+MEp6rEh2BTnNHZYWsvyjOwn73wwsq7cgMuydH8Qs6viWEZ2x+BnARIupXUtwvRK9IN/y9MIp8HI7TNM49DIKm0XLM9f3Dw/gJHdrjvV0cMzXEQH1LEyNOCbMtDfMX9Gb637efHij3cAStNZvxyZOHMVavRf3adPYtNY3+bNVvruQlABf6stC3hfSqRTuA2IJ7m63T+MXzjfh8dzeO0LldD9DTcVLCrEgDvWhFv2+YntHr4ILqUrdKnHD+grpOra/G7NgY7tBqvqO6BIXvcpAHWvYs38GFcNrUHYsjlhxm0wa6I/TV56iGTwF4h1dtVEMXE8cyVEl6o+w2vCnk/tW8f1/uHYYgLDh+OgxK9hGiXzLk/3RzM/Z6dObM9ymGKchvqOmFAPswDWwSJsCg1watE+5XDw/is/VnOMZb0a8zQmMwoU3ch90C3OXcpXe1eV3O1999kO0Qc44PIeoCcIsR3xqzLT9/8ignB1qMvdUQ2elz4czIRQJ1IcDKntLrIMEIOrudmT3Aari/vRGPtrfjlIKV1IKDRlLmfSa4CrDwXlQkj/PNAH6iDGU9p5QgFAfJIE42hKyIz6y0A8EiWAj/vJcICvfy1aN4kgRRjmUOyi0yufR3WJaxe0hOmwFJm47u8e5OfL6xxtTWaVpSztQIclHO69ldooMT4kwouErmCYRpin25exjbbQqtASi2o4OO9DgJgMWUMeCsL+ecfrCZWT5vs/Pj3vw6xKmgbhog03W+DfOuiqRU+mjyFs9oCafoOsvpYJOO4iQahXO2jFOoFvARKu10kYxRibUxDU/Nm7yUJxtxpWdDx6mOhZMAE0caXwSpfj1IYw/Cs2V6loOUd4LK+PT5XqzMt6J6rRKTUADVWUedV45sFcrKAI8LARYPs1Ra+kovKnWP8flnGxt4x3ai2bNaZkyQEsUmw/BCsK3kwFjT3uSVIyaDHeIJlRwB2DpMmhupxtLcfCzOzMZ4qRGtneP4Yn8/vjjejx28XRRFYsphRKhz3vTLI7W4R/xrzLvpfnQq6phpqJ2Tw9g62o9DPHqnPMfPnp4+9ShDoPTrSkzRxwzpJcMLgkxKRhGtYAPpGmPxcL8ZP1nbioXxm8xoM7ONBFcBX7aZY5Grv5d43MyMPnSQvdIbsXl8Eut7O1QCo5yedVAib14PpndKXPCzMB6IjyGbulJPRzGOF+VbM/Pxo5XrcXtmLqbqeLDU3fO9eNg8iX949DB+srkauzDD0eAJEm1z7MKwlYmx+GhyBMc5eVFOpcKcBO9OxqvRvDYS++1ePEAYnuHkPyZtizQO1ZWvMq1E5juCG8Lhm1eDOngYlCM9cG3q7+z2Y2Zm1uanYmZ2JkaonLMmg/EHEQeV5epCCTZTo6hPdUMegNLjvb1YPziAS/AerhVAvcjINGeB+MVojWoQRc8Z/0jpGalG0hbxB/9w+Xr8p5Xb8eHEVIyrHug4Mg6UNpjSqd/5MGeTf7r1jF4ckJgIRQQTnHYLH3O3FQ1coWSVZlMFp02D3n4SRk0jutPMwc1PHaSJtcGQ3okAKIAeykK6i7Z0RvVLF9ZMmpkXIEUhIHnmroRg7Laa8YC5xdtMpo6hNhxgOcx+EZKbg1aOvsgOZvDWFTdOKlrdU0R/iwnKp878MmnZTUcOlUzAXmT38pXajtKU4mFnR34obRzZeNcQhz9j6PkX1z+Iu+PXcoa3S4Zrh3u5/mF6ciqmuo24g5T+x1t3Yu8Yy+UI1YQ/QN1dY2DzdH8vOvTqk8wS12BOw3URI2MxiZ06hu+gAq1T1W7cJY9gyr6/vRkbR/h7WcBSqo5RN3V0wfQCwpdrQDH53nrmyiHOSrHuB/RBnKC6Hm/vxDatb3pM1WNmIjbI2ci0mgslWM4JeJdUbSRik5HMOpOWLTiV673Uheeaz8ukFXdKiuAOVYOVqANuhYUk95ZW4i9vfRQfjCKlPNcp/2uk4ZMHn8UBkvEdJPfP5m8yGVmLbzAx+f2FFWg4UgXTDB0x9uKQZn7UpJM9PYwavTvLf6j3XsxPXItF9Tk6eiqlNOLG9LUYHRmJT5+uUo8m+rkJWHR9VvQNwSoSLYVJXOFJSrV1sVXuMCO+dXIatycmeeXKozbPBRl6TAgEFwNsxkQQJFfXrDG9rg5uo3vtVZ2hfSNxANtFenVLutDEhlmFYU6hzyNx37l+M3Vohby26Oj+39p6/MPjBzjpjwCvG9v3n8YcK3O+N7OA96qcqsTp/v3ddQx8OivFCFA7cK9Dvs1Enm4XPXjIiGujeRpLSNUHs5OxODGO9QHINZznTG6WOmvxkBZ5gv5VC2thXBSEnr5cTNNCGPTPCZjPNEMPWN+xtrsXzZlrcQ2FXdbBRXYOtYYhGTO8OTsbSZCQgIOTVmwdNmkSmk50FFQoFf7FdGUWQ+JyLJ9go4vJqwSzbk8zZY5E2SEcI40/fb4ef3v/8/gFErpOi9mN0Xi2zVD84X2mn5rZTFdGR+IPb90GtKnUtz0sGvX4JLO/C0y7TyKdqfEow7JPj4/jydYWU1ersbF3QNxeTNDF3xydiFt0SuOYfuVEzNiXBOpnFyhgWV8uh2ClbuZhG8auoSYOWJ2kZy6XHyQFhfVhcrQUARCSkZSn5i2nCkBFgMLmKcuZmFvrobuqsFTVkDrpEs6bnbnIRSXXHrtDPpp6/fJpLEyOxjItoUFej5g9+CeG3U+QqEYflyCHju8dRO5nm0dxd/swppYnY4LKfHt2Lj7fno7dtaPY4n5xoh7fWkJXjzawo8eiSSW3sDzWdpuxS+fnsqznu0egtB6l68wYj09iTiHJE9M07f1oM2A4gcFaJIWFLKLSXEAB+YmoKk5eCDINJB8LV0aks1tljcdz/ODXEYxau44AsBzBFpYgicO5MBRs/ZzkpVbB3DmJI2Yp+iakBNNZoGVcHuSgrDNHFQ1NmXON3n2eJjsBiBVA32Ad2lM6thNEogLVY6gV/9p0pGsMFn787AmzJYdpz46jGm4prfhpFQCBXZgciwV07QqdzjeZcv/+4mJ8nwnL65PXsLHT0o1tBke/2ViPTUBgfIT0VuLO9EzMkt/LKjh7jQQk6zeoZyFMRU0FOYEWbI4OLw9pTft0tqeqROmnFZ7H5iWAi2z4RTeaQQudcohebGG0+8yE5xOfxX/lIgnhWQFvcfZmhPH8zBhmFVLTpuQd/BqHx0c5YmrTG7TQY46yKiUW/o1EfLazGo/QvY7QZMA1mvg4utkpqBNGe7uHLBI8xkbu6+hnhSVd5k3UyI8w/+4tLeVCwDYDma393XiG3XqqasFEm4cBC5iGDe15QlpQiqfXg+NtFUVTIv0KDkKIEdDGqkgBPcsgs7u4k0v5g70nEOTaMc99vGbDtO8CsgwS6Ew0oNalSfK3LMBQeEInYZ5KVgmxKWPnlpBcrY0qTJ0bZSkq5TJ1mjmUtV/13NG01/BDn9C6JjEjZ2Dc8tQ0c2eTLGWtYDHgPl2YY1KgFUe7p7ku7tnWNuqBQcEY72nCM6PjUTuGkehn277gDKXtBd08vCRItwla9Cu7CMkpnbPqLecbrfsg3ZkVIUcKz5AvC19Am4JPGHEpQT39a2RoR/k27pp3MmFQSloccDsZB3hZAVrECKrAhdMC30Jqy71WrgebxbH9XUyzP1lAEqfniIMPAAR2WAqwxwCjjUo4pIAjHC51aBwrNVlIeBg3cIbfQ3qxfFEhNYbe01g/+zn63EIdbaCOpurmFzE7PhZ1/CrNHnPJVN5RoEZu4aQqKjAEibvXAtVJtafZuO8SBVSQXrfMxzoNUpwBPMwhh6IJcCU7CjmjA8N5tUzkD7QkSMNEr5yLXpaHxJVxSofMaQPuHpJpY1ImZx0YsG6i3kbKEExdo5PE+8HyUvzNyp24XUMi0dVKxTMsg3/eWI3NDl4s9GiX3lYrxVlq1xFr+Dfx1Y5iBt7GSqmRboFBx1SdDrBzgFlG54mpeYKETJFuFCY2nObimUFIBPR8vV7W0RntpR8dUjQgpJeWAO0dEuiBGY5ihQrSXw8W4h6KE9YGtDisiDFt9gna60leemI0R7U1TKMq6Gp5mPgYm3fzYC+OcHs6tFwZm8RpMx40VqwIRj1I8kdYC39+/XbcwnivYU6d1nrxq/3t+G+PP4+f72zEHirEGV19FlURoDBnHU7RdrutTjx5vhVHJww6yG+uOsrC61EKZ4AEmC4oOQUCF8pUaM4jPEs7GClQxxus+/DIB2/40eYQUBWdh9cp9WZVZHeZDkYyID7VgwBDgBiZxjOMe2Ow3ppEriPQl2FfosS1aQ0bgHXSvhEVKjeDjl0cm47xvSbbBDo4fyrxzcWluMmKdJveFs33F08fxd8/fhS/7hzFHmn6mHfjLSwSWoMjgDadm6MyJaVeGonmIUIhwBAwgXNoXBGDBicMDlApp9CkO7NM/nXsaIHt0Wn2aRVAe1avF1dnj167sFWSNFukK/Bz9pyyhmk9v6YizEX89OFqrtg+9VaVkUD9vjmjyr1DwsuCRneLJpoEkJkmWupuVvpssBnjGQAsNWimSNHy1GiMrWMRYBWMYCEsMnweT7VUil8zLfV3Dx7EbxjsHLNwsMa4jkEoHR19RBcPNQXkJhZ8xX2kOhe2EGG3zoI+lrCPYNI1SDGaswOs5EnfsrbvZNLUrdL7kw5HNKhQWSTDulrtgUBfVsV8nhDQoDyjpQprxMQ+408mXghwvqYETXABTXA9+0cGSia3Z5x6lYosgw7DwUVyNdPAbny926e4+nC63Bvtxwym2IcMX6+vPcOUYsQFQTaPMvq0j53apElvI6nHMKZUZnUN68f6SF+r4pwYzCZLR5zqaBAj4KMApNXmbloqIyiEXexgO9EGIKrunu3tRwO97OaaAywkhaBCp6lT35ancHlcWjnfDYJq0JVLiY+QqkMVSE7p6iTvCwG2gHSpE1MJyYMMlFnBu1x2i5JNr6JHEO2YkxmaZi78OzhtMeW0E3uz0zFF7W7QKd1bWIrfAHAT3+AO+rldGUXHRizRWc1em8BzdgizUAcwtoRd282ZFMWkiz1Nk6diZZq4K200/Z6v4rceOc6h/QFMao6gH2GeMzAnO+uMTPezRe3RJ5RI45RQoqIUf5WQ2JBUoSjYMuAOmQgCP/L+taB4q5FMZG9v3Cyai+H5tUTnHhhfFaMetpOzFdgxKc2nrGx/jB5+gBesiXQ2ePjt2QVGZeN0gifx8GArDmhvTifdGZ+K77EAbx5zrt7HDihhljF6mkL9zBNnDkmfZlg8wijT+HY5Un2K4t/C6linjN3+aTQRzSPiHMPAPbqjzfYR017N3H+X82mkzX5F0fsKQYysW7qMTAuaQyG0yoaLJRhOKoFVuJu7fIzMIbiC5G0CzfnCwMvkHKXZBJ3Xy1G+CWn6W4wOf4Yj5kPMqEmk9SYbUu4xMHj6eD8e4fx5Or0Qs/iEHUT8cG4p1hgk/GL1ObuTjjDtJuODhUWmi27RiTGVBePu4xv+lOmsfZzFroHssNRJVdLTtlavQq2jR/WsHjxBcCmCz86WP72xQhfWssjPKqGr0v9gfipkytQLoQq7GGASiYW2ZF1f64Cz0uChqlFfXRp4P2xt6myvbQ05C0KpLTxhn28+j/vujZjGyQMVP1y5wRTPZjxnhPaPT+7H8kffjhtjtbiDGfefb34Uc+hfBxo355fj3spS3MCpPgJYpzSV782cxvXqePzT08exhsHfhF6ntWoICTgiZciahCQNA9qJI/RF1Yp3l9bnshf2bORfp3N2K1jW0bgI5nBPx4UAFygCMOCOjOAhQpIkIcUertjx2qQuA9m4Q1+qcVQXBpUNyVOKd/B+/RJp/RDVcJOh7kf4Gf7D4p34W0Zk/7y1GncYhY017sY0MvAtPGDL38YEg1OjOIwmqEBKJBLjKvSJcdaNMfNBLxb/8OwR8bBIeS5D7ZBdcdS36Z0LwxZFNMLL785Fe+NlhfJtD2PMmLid10LFyHGD/bXVzvq+movFSVyN5txglbfSICEmVssl0K8mOndvXDNX0ofpLEidZQtyQrQD93/1/El8frCGXm6lbfsnzHTcu34rdtjT9j/WHsbPt9ZymOusxwLA3gTIWVZNj2IdrLX248ebTziz8JA8V7Cp/+jWrfjG/Hza0y4D0Gyzc+soFFbYg2tHjek+hZ73DWRFEEj2SLtmTanN2hZ1FicDxg4PANOz0ja8t5s10TWMcZ0jZZp1H7tEybW1XSa9ZmoQ2AyZYXFpi7KAwtdRZoXMQXzCIo4bYzNxtzyC7VqPP8aX8NnBs3j8fDf+e+uLOLpTjg9nF6GDygDkCfaYg5X/zTKmh2wP+9Pbd+MvbnwQC7iElmkN38P3+/Bwh9lfO1WG1BoblJhrNyh7yHQpkrT3DUX92ggNQ2/oHrGlcFBClietCLjTdwUYOePAtVZD7ifGZhzBCeGe31mmxDeQGM2ZbHI0t1w9eQmJEq71MMCTu6JiecFPtgKkqMNQ9tO947i1cxAzi1OAxG4ffL7/ZeVu/NcTXJXYy6uPH8bczmYsMuVzDcAOsRoeNLdjFSuhw+ivv7oaU2Pj8Udzy8zhVeLe7Gx8OT0d+6tPY59RXi4xQBE7KFE6pM0W+HXAHdYjwGgU+3oe3/QoLcZ9dVWaU5mylOc0FM4ic2GhDotT8yu1IDHFdMw0za9xvIfDfyDpJC6uzqd+/fp8JZLjgwfJVK4d4rrp+6ePHsVN1rmNY66NoMu+u3InHiORm/e/ZEb7gCVbJ/GcgUSD8a6fQWgmc+hUcF9uqLMfPorr+jTw886g1v6Umd4n2NpNbG4hdbdpmmNJYgFycv91kt/5iZ2jelavXE5ZCRsMLCat1L1W8BIdLNTuiHdl4UStEXM0vVHXLaQqSd68MyEXRaRouFtY2CwhjKdHu/G/7n8Rv8GCOGJwP8JmxR+ij//k5kosUIsSdusxenofKTmCOx2ALXXpVFgW1WHm+T4O9V+uPslPIZSwjT/Ebfn9m8xKswqnh62dphnp7OfOq4iLaHvnZ7RQN9GsUJbrMFw6kD2rDM2ujQIRIIUpQ9pxXKmrlE4sRiTE8TwObd2KWBRO1UhhNnE59J5BaTZvGSmPT+nUPt3dwjx7FBvsunem4CbA/fX1O/Fn2MGztJwOLs0mjtwjt1zRtE7pBFoch8jMJhT9MyuAHqKbdSppH9/FaTSFna2TwPJSM1Lc2zpoor4xkB1Zgiy5+nmEJXwnY9QjzTGxA9QX6nNgNQmqoRhUDCKRSEXtIpEFdNwchxKsBukCsuevEwTRlThaj64i36PZ/xyQPmET4zbDWx3pt2tj8de3vxl/vnQHkImHL7kNuH28ZELmPGGJa9fqPkP6HzKB6no0+4pJtshOuc+NclzU4jBdwUgJLqr7lclPnBj12SpUpfMI3hJMrFNeiWcpNKioniYbNVOAEvhXS0oPVT60Z+yyBKkRS3xz4T6V0LldRrqGO41eTfsu90pR2oow0I8fuaXGFUTPIf4fcU1WIfAvWfkzD/grjYn4q7v3os4Uzz9uYl0cMlOM5JbYkWm/BTF0qDiO6hMxWZtIvexoyjw07wqPmx23klUIyFmzfRdiz8XpUU6J8jRa5ZHTVPPo/lHbu0LNMD7lDqZanhBfCLB5CrIZuQN9gia8zErG6R2cNPt834E3xaYBY371IBHaoRXEqY7a6alLcS/a5J8yQ/v3D+5H/3Qv/uLO3ViqTMRKfTz+6vYHscx+4l+tMauxga6u6hQCXwYp6sGP5xfiu1gPk+hv1iNFk8UnJ7g53VLGqgU1BQyhyYJMtnARSjQup/98lKLFIlxkYAueoHO7Pr+IiYYNTNOoYkYOHe45WW/eZPAawKkmpEAHLpJQwvYVzrmxkfw8y9ODJk4a5g+S2IIEcEmOFvzzxucERfWyMNQxmjSUVwLxXq1Y37uBKfb3DJd7SMSf3/xGLJT4Sgm+3R+waOQj1po1l45zduIQUazzfH58BIcQVohNlSJ3TjrxGxixg4Whh80luIpYMZVDHEnj9w3UJemqE5lQYVgKi1ItZF5MWy1OLcYSSwV0aNkixMgWpW/jfAs5A3ioh8XDhyVmZE/xu7bTrouYo8l9EzXxaGs9DljpE5Ux4pGtzCCO1q1dY+5BTvB0jV9cBQcqNSRXQvx+mgzyesS5fIJzgM8g9O+wcbeg+o9XbsUH9akcIi+zALBUp/0wglC3lljYojoQWc23Lw/24ydPH8cv8HVsQZMzKmh7dDqZygDyt7y3BaJSf1QN5ddkPsqsjScw+NrFIq3t+0wULINujWfOhkizK5DrcAWo85CmM4BfKhAK3FMs4/PjQxA3hsq4zpLSW6iKTXelS6Q0W8mUBwm3wvJaxhfy/FK+524EOetJRayM90JhMH0LydyEgB+zYG+PhYffXVjO7+7Ms67Cr0zRVgfE80UV6r3Fl6q+ZA2FXrovWcesy9PP0wzzHNql5v9OAXqG9WLCJHdYSZ7bt+7iJ/kGammCzjmFQ7LBwhT+ZVmDQi4EWMiY1UpwuUy3m/NWE4yM7rK2bH3vMB6z2EJBNe8MXqeEFMpdmzMxG77/CmebeZ/RI2uoYw9V9avNnXjKsUiPvcBqy3G+TiJ2FUDuQpctaosPfrhA8TmS7dYynQDaqe8brJfryqSlg5pMgcFfPY9l8g1Mx6UyC2CUVopKtcpFNuRXCrwQYGETZNmSezCohObaFE3tzvh0rLMafY+t/4f6J4yGzNmBZBMUVQ/v853vv2IgfaXL6knK7TMgyTXKuCH3YOwDthY4vu/TTC0GwyMPV3O6vPY0D7c3iG7OI33FwovotihnYezQdB04rK1Dwz2G5PcmZ1i/DA3SQRy5UPyR1jpL2CBcCjBVJC7mB4nLjKD03PtVk3ma7r2ZxdhEah7iv3Vq3w2Kym1PdkpLFjcs4v3OzFsigcUcnMQrkT10oXt7/ByCkqvTqK9uTVVgi8OEQnqRLaTJMaIpz9X2K5Bi66yoe8UPq6TqylBmu7/D2uM5yqkxtdVlBGcnav+VssS1SimLtFiOCwG2qVdJpCdVG5W6FRHRry3Ytsz2/u8s34g2Pt3Vg904JiOXPzmCgQcArJq3hPcPrpFQp9tC6M4yvw4eJDsduxAcnqljbSiF2NjJcoWOdCuC5RfgSkdGMuJXCh22HZRZXKiXbJ6h8I+WbsSHbEsYN3/nIRQohYt6W8ZFpVwIcPby0kVibV6dGh51MnLZ0QTN4g426dEiH5M7buKzZeaWUZmjMw1xRzlZpGLwnqFf1lFj58IwmcMtVdKlw4n+l0pLGR0qNCrJjvvtXi0x+4JCd3n3XhSkVYV7QC/jKDh+B9/ItycZC/DJRyZTos9ERJ/t9w473lTGhQBLkb2jm0sErWjygAetDpddTzZND/rR4kLssUj6cAPXYMqMQACuIHC8X9UKPNxn5wocWwaaAhm2GprwyqZl2FJsNYJqp8yDDMSQ0f45VfSugbomc8gU0rkp1KM53J5biD9gSusGg5gp+h19sScwXNvXcvy9LFwIsKaZZaQ8UJDDvh42YZfnAjeh9OCLdZX4x8tzLAs9it+gj4/gdq5jI3HPnpdyNe5llkcBSUFK3r6BsLQkZZR5gLJqqo96sCoeuYckz0V+r1fSWJeHXA4GI2xkCpIszI2VtkD1PTp2BKvBXUQ/WphhWovlXUyqajE4I+NidAcVaQQohBTnkcHz4PpCgI2kLi1CcWEHpk81l94DpB+nGCXjZcb/34W7rsN9wJebXCziWim3TOXGQ9KU6CnMRYlLzhUZv/G3kP8Bcy5IVzDojVm89aWtQr2DLYQAQCEdZI9O2zlEVdD1qfH4+IPb2N8zMYozR6YLfgVLRcaf0Ug2BUqvF3kpwOejglXRDGw+Im/uIKwqaDDReJ11uaWbH8LBh3ykw/ETpMMQW4JFl2jGNiQbsVDn7MJZkz5f0r/utZh2UehSqW/FzT0VFqOMMoN9g1HrxzdZJzc1g7+3jr8BqcVySTGlw0vr4h24/E4AF9UWKOGhKwFxTTMNuXHYbY8/OjkdpVvFosEv9cviSlSXqV7sbakL6kUOcUiYD/5NA8AiAJLSdbhLfVxixYqu+Aa7hr5z8w4z26yop66jEOvHnytIL9WhCrRmDj9e97ZqXAwwmZLPoAkUKBTbtgCVZmRHkx9mQzL1t1q4pswKI63v37kT5dXge5Ub+W2JoDnpD7A5qe/01coYrrKEIvd/g9/sEwcreriusBFnFIn4EOvoB9dvs/eNESMEu43MpQHOivjHVTJFip3vE6c3hQsBNhs56/l8SJ0D11XydXSU5pg2Zy4FpQOYgIg72MgjN+7ENRZW3+eDoG77b0JF22kemKFDRAVPFq8XcL6wq76mfDf1lFh5yXCBfW71+GBuNr6LOXaTVUXXkFA+NcKhQ6ewFMoIksBoJnrm8VvDhQC/LZUSyHo6ysA8glBNuSp6eRQd5f61UWYiZpgZXmpci8+fr8UDVjQ2ZRfe/j6jI1Wzq8OLBvq20q7mvSNU61FjrfEd/cl8IPQWwM7ySUWngtxUWIfQKuNy41Won3RrtnkgV8XFW8h7L4CLghTBYgBg/2p5LlWquaSHm3EkYmxuhambyRjd3oovmeXdp0PMlYwDoqBX2P/1QhZGL4LkKr1+8/0DTLAfzLPghZVFk+jUOq3SFtlBL9dQh/YfOtmtszVOcKW4MMyLh2+owYUAS4cZnQ9Ka9Ek0EGYNi54theWvzVVBSrDZl9CL2n0t5kFHuHZDdb2jtdwTjP1/ykqY5Ud+wf01ExtsimbUsjEHaX+rwBOw1uOz3IHPfmehQTn7C5NqVce5cvUk6TD14fLE9romMqYjlVaVp29FHZMY8zQLE1P5vKsG6zDWOJjwjWMbXeElgFVidWRr0oT1MLqgTJuFKT8ATmivjUw3D9fi7fGzwjqXkE05Vkz59phpROC7LdhIbT7IeidcaJ30CNHWA9rVPJzFpF8gdpYZyGLftakmirBIg6othYc5lXM7RQgC1wx5rdMogxIVbIym6w5IGR0ty7ohUMCmcb3O8GjgOse++WJibh7fZn5tPGYpSjBHgXMUeL73Xc35VZhdF2XHfAqRNnBSRfvh+Va/KtC6LNXw3sDbH3OwM1cuaNyXbxO7oE4Zqjrngww5pk7lpxur+QXTHaYcllt7sQaYG9t8wkDgO+gWtzWmotEqNgxzlyHygWcQ7JfVC9x5LFPjGbnqZnVRwp1VDm+7nHtNoWZCfeCjMUiU0srjMzcDDkKOg08bjWa/wgdsv8fR27EIa0Tsc7HpK3LfTEJXJT9goIrBNjKFQBzcS440rNBCGwH/2lKuV5zVt855XIscNy65PQIBhwywbnPHN82a9S29o/YeH6aRxO/6wFblFo07wycUnrP1U7plw6XcglwDQaWYS5DShzyrEZiHfEMM76zzJstAuoUU00TgDXF9I6fgXG2XO7bibFPFJXAWSnGwnEcZReYJcisgdyeK55n/woAZyn5Qw2Lf5wAmT/VhOsWEEtGSHQsqIkWIuFuH/eTtdDRfhqL2ffcyX8IOEcso9pl38Qh+yo22myzZSdnG+lusx7CObhhUZ47oOC3K1zGqh0+RjMfx18wyeTnDCvjp912y4zzKCrAxTMNmK9V4Mc9/UK7XHFajKQA67weeeljSGgLVZATpsYlvAquz65MRYBRSrCFFAFYfSjK+QvIjo6oVD5C3Jxy6trmeKQOZ0MVoz29zfqSAR5y2RGN67PHV08AnhbQQn923LOBY8mFfjnJaQEEl6TaEzaYumkAzoirQJnSGkESXd+WTnBQsRHYdepqZZNRcQiXloKiz7BXJrnWN92gZGvXZovRFfqm8C4AX2hFvCnTd3lX8B/iIFJpdvo91yTYcdEEnRh1dCTQfn/Cua2G2BN/An1otPw0F583YMl1qp0+oNs2/GcgSoqVK8vtnHI3FO+UQnFz77PLqCqcBdBNi9mVqh4oR9PL/6oHUSYt+rvAPDPVisgHlvE1w5UALE1D3gtazlDzJHt4MeJI492ZUZDSe5UmHk8dtHidy52ElKahfxf7qcjUbt1/RZNJMLM8MlfytPyqgC47dLEqiTm8p1BnSFzPkTqWc47MSDOkS6n/bYKbdL2PmQY+r4WUrpeeDmZieSagStwLi9DKZheYUqwmyQGIyIoeILoeQ2e60mxq8zgfhjZqCjUvi05Q0ADMPywZ248jthwskJicMzgbXdjdSrCMLzI33Vkk3rxSZJH43O8wv3OPXrt8LzPttVze8EAVUYAAWFREoiS8gH9w4z0q4HyV2gCUEJ1DVgYN02fllOxBSBAF03v4lCoDvY+gJphn8YgDvvnMDu2qw5WpiCHhL6Si8MKdPRcs2+agjtqa57BEZk1ZyJBRUpdzLq49F2AO7803n6EexB3+6PdPnhWAkpvF+W4g5aa56nDlEnxRBVKC0QsFfEWMF+qjuNfgSOkfZNDX2X0uuJo80R6+Fzyv8zEgk38qHMAs3pBbMtVYBXPE/6rDvwnAVupMRVxSw0IZvHjpctnzHMnRleJ4FlJZA52Avh6MeZ5Fxro45utpv86TK1cRlxN3HpzXY0nY+RiFPL6IZ1d2PqBt83b49GWNXsQcvjuf7qqv/z+2r3rL8who5AAAAABJRU5ErkJggg=="></image>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>

                <!--<p class="a-merchant_content_replycount">{{merchant.replyCount}}</p>-->
                <p class="a-merchant_content_info">
                    <i class="fa fa-tag" aria-hidden="true"></i>&nbsp;联盟卡可体验任意课程{{merchant.experienceNum}}次
                </p>
                <div class="a-merchant-map">
                    <p class="a-merchant_content_map" @click="gotoMapPage">
                        <i class="fa fa-location-arrow" aria-hidden="true"></i>&nbsp;{{merchant.address}}
                        <span class="pull-right"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                    </p>
                </div>
                <div class="a-merchant-reply">
                    <div class="a-merchant-reply_item">
                        <p>{{merchant.replyCount}}</p>
                        <p>已报名人数</p>
                    </div>
                    <div class="a-merchant-reply_item">
                        <p>{{merchant.hot_num}}</p>
                        <p>热度</p>
                    </div>
                </div>
            </div>


            <div class="a-merchant_content_sub clearfix">
                <p class="a-merchant_content_hst">课程设置</p>
                <div v-for="(item,index) in merchant.subjectList" class="a-merchant-content-suitem">
                    <div class="a-merchant-content-suitem_img" :style="'background-image:url('+item.adv_img+');'"></div>
                    <div class="a-merchant-content-suitem_info">
                        <span class="amc-suitem_info_title">{{item.name}}</span>
                        <span class="amc-suitem_info_price">
                            <span>{{item.price/100}}</span>
                            <span>元/学期</span>
                        </span>
                    </div>
                    <div class="a-merchant-content-suitem_desc">
                        <span>共{{item.total}}次课</span>
                        <span>{{getRateLocal(item.rate_type,item.rate_num)}}</span>
                        <p>{{item.during}}分钟一次课</p>
                    </div>
                    <p class="a-merchant-content-suitem_age">
                        <span></span>
                        适合年龄段：{{substrSui(item.suitable_age)}}
                    </p>
                </div>

            </div>

            <div class="a-merchant_content_sub clearfix">
                <p class="a-merchant_content_hst">历史报名</p>
                <div @click="goDonatePage(i)" v-if="replyHistoryTotal>0" :class="{'a-merchant_hisre_item_tw':i%2!==0}"
                     v-for="(r,i) in replyHistoryList" class="a-merchant_hisRe_item">
                    <div class="a-merchant_hisRe_img">
                        <img :src="r.avatar"/>
                    </div>
                    <span class="a-merchant_content_hst_name" style="margin-left:5px;">
                        {{r.childName}}
                        <span style="font-weight:normal">报名了{{r.subjectName}}课程</span>
                    </span>
                    <span style="margin-left:auto;" class="gray">{{r.createTime.substr(0,16)}}</span>
                </div>
                <div v-if="replyHistoryTotal===0" class="a-merchant_hisRe_item">
                    <p class="gray">暂无信息</p>
                </div>
            </div>
        </div>
        <ReplyTabbar :page="-1" :aid="aid" :infoNum="replyInfoLen" @replyListClick="replyListClick"  :mid="$route.params.mid"/>

        <mt-popup class="a-merchant-reply-list"
                v-model="ReplyListVisible"
                popup-transition="popup-fade"
                position="bottom">
            <div @click="$router.push({name:'donate-uid',params:{uid:item.id}})" v-for="(item,index) in replyInfo" class="a-merchant-reply-list_item" :key="index">
                <div :style="'background-image:url('+item.imageList[0]+');'">
                </div>
                <div>
                    <mt-badge size="small" color="#fc6b79">{{item.childName}}</mt-badge>
                    <mt-progress :value="Math.round((item.paidFee/item.totalFee)*100)">
                        <div slot="start">￥{{item.paidFee/100}}</div>
                        <div slot="end">￥{{item.totalFee/100}}</div>
                    </mt-progress>
                </div>
            </div>
        </mt-popup>

    </div>
</template>

<script>
    import {seller} from "~/assets/services/shopping";
    import {wechat_arthorize_base} from "~/assets/utils/wechat";
    import {getCookie, setCookie} from "~/assets/utils/util";
    import {accessToken} from "~/assets/services/user";
    import {getMyReplyByMId} from "~/assets/services/reply";
    import ReplyTabbar from '../component/replyTabbar';
    import { getRate } from "~/assets/utils/util";
    import {listReplyByAidAndMid} from "~/assets/services/reply";
    import {wxJssdkInit} from "../../../../../assets/utils/wechat";

    export default {
        name: "_id",
        data(){
            return {
                replyInfo:[],
                aid:this.$route.params.aid,
                mid:this.$route.params.mid,
                subjectIndex:0,
                // 课程显示的页数
                sliderPage:0,
                replyInfoLen:0, //报名信息条数
                ReplyListVisible:false
            }
        },
        validate ({ params }) {
            // 必须是number类型
            return /^\d+$/.test(params.mid)
        },
        methods:{
            // 进入页面执行
            async page_init(){
                let openid = getCookie("token")
                if (openid === '') {
                    let code = this.$route.query.code
                    let state = this.$route.query.state
                    if (!code) {
                        wechat_arthorize_base(window.location.href)
                    } else {
                        let resUser = await accessToken({
                            code:code,
                            state:state
                        })
                        if(resUser.data.openid){
                            setCookie('token', resUser.data.openid, 7)
                            this.$store.commit('setOpenid',resUser.data.openid)
                        }
                        this.check_reply({
                            token:resUser.data.openid,
                            mid:this.merchant.id
                        })
                    }
                }else{
                    this.check_reply({
                        aid:this.aid,
                        mid:this.merchant.id
                    })
                }
            },
            // 查询自己是否报名
            async check_reply(params){
                let myReply = await getMyReplyByMId(params)
                this.replyInfo = myReply.data
                this.replyInfoLen = this.replyInfo.length
            },
            // 滑动事件
            slide(data){
                this.sliderPage = data.currentPage + 1
            },
            // 计算频率
            getRateLocal(rateType,rateNum){
                return getRate(rateType,rateNum)
            },
            // 查看列表点击事件
            replyListClick(){
                if (this.replyInfoLen >= 1) { // 如果多于一条信息，弹出框选择
                    this.ReplyListVisible = true
                }else{ //直接转跳到详情

                }
            },
            // 点击报名历史
            goDonatePage(index){
                this.$router.push({name:'donate-uid',params:{uid:this.replyHistoryList[index].id}})
            },
            //查看地图
            gotoMapPage(){
                let eword = this.merchant.address
                // let eword = '湖南省岳阳市岳阳楼区花板湖路48号岳阳市第九中学'
                window.location.href = 'https://apis.map.qq.com/tools/routeplan/eword='+eword+'?key=XOOBZ-3G2WU-ME2VZ-4AG7A-4NDTT-Z4F7O&referer=791'
            },
            // 去掉 岁
            substrSui(str){
                return str.substring(0,str.indexOf('岁')) + '岁'
            }

        },
        async asyncData( {params} ){
            let res = await seller({
                id:params.mid,
                aid:params.aid
            })
            let replyHistory = await listReplyByAidAndMid({
                mid:params.mid,
                aid:params.aid,
                current:1,
                rowCount:10
            })
            return {
                merchant:res.data,
                replyHistoryList:replyHistory.data.list,
                replyHistoryTotal:replyHistory.data.total
            }
        },
        mounted() {
            console.log(this.merchant)
            console.log(this.replyHistoryList)
            console.log(this.replyHistoryTotal)

            this.page_init()

            var that = this
            wxJssdkInit(window.location.href,
                [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                ],
                wx => {
                    wx.onMenuShareTimeline({
                        title: that.merchant.name, // 分享标题
                        link: 'window.location.href', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: that.merchant.logo, // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    })
                    wx.onMenuShareAppMessage({
                        title: that.merchant.name, // 分享标题
                        desc: '一览无余，全透明课程任你选', // 分享描述
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: that.merchant.logo, // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        }
                    });
                })
        },
        components:{
            ReplyTabbar
        }
    }
</script>

<style scoped>
    .a-merchant_banner{
        height:200px;
        width:100%;
        overflow: hidden;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;
    }
    .a-merchant_more{
        position: absolute;
        bottom:20px;
        right:0;
        background-color: rgba(0, 0, 0, 0.8);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        color:white;
        padding:5px 8px;
    }
    .a-merchant_content{
        background-color: white;
        padding:10px 15px;
        height:242px;
        margin-bottom:10px;
    }
    .a-merchant_content_sub{
        background-color: white;
        padding:20px 15px 0 15px;
        margin-bottom:10px;
    }
    .a-merchant-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .a-merchant_title_phone svg{
        width:53px;
        height:55px;
    }
    .a-merchant_content_nomargin{
        background-color: white;
        padding:15px;
    }
    .a-merchant_content_name{
        height:26px;
        font-size:20px;
        font-weight:bold;
        margin-bottom:3px;
    }
    .a-merchant_content_name img{
        display: inline-block;
        border-radius: 50%;
        height:40px;
        float:left;
    }
    .a-merchant_content_name p{
        display: inline-block;
        float:left;
        line-height:40px;
    }
    .a-merchant_content_replycount{
        color:#fc6b79;font-weight:600
    }
    .a-merchant_content_info{
        margin-top:16px;
        margin-bottom:15px;
        color:#999;
        font-size:13px;
    }
    .a-merchant_gray{
        color:#999;
        font-size:13px;
        height:18px;
        margin-bottom:5px;
    }
    .a-merchant-map{
        margin-bottom:20px;
    }
    .a-merchant_content_map{
        font-size:13px;
    }
    .a-merchant_content_map i{
        color:#999;
    }
    .a-merchant_content_hst{
        position: relative;
        color:black;
        font-size:18px;
        font-weight:bold;
        margin-bottom:20px;
    }
    .a-merchant_content_hst:before{
        content:'';
        position: absolute;
        background-color: #FF7112;
        width:3px;
        height:14px;
        top:5px;
        left:-15px;
    }
    .a-merchant-content-suitem_img{
        height:150px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom:10px;
    }
    .a-merchant-content-suitem_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:10px;
    }
    .amc-suitem_info_title{
        font-size: 20px;
        font-weight: bold;
    }
    .amc-suitem_info_price{
        color:#F51F4C;
        font-size:20px;
    }
    .amc-suitem_info_price>span:last-child{
        font-size:13px;
    }
    .a-merchant-content-suitem_desc{
        color:#666666;
        margin-bottom:10px;
    }
    .a-merchant-content-suitem_desc>span{
        padding-right:6px;
        position: relative;
    }
    .a-merchant-content-suitem_desc>p{
        display: inline;
    }
    .a-merchant-content-suitem_desc>span:after{
        content:'';
        height:9px;
        width:1px;
        background-color: #ccc;
        position: absolute;
        right:0;
        top:4px;
    }
    .a-merchant-content-suitem_age{
        color:#999;
        margin-bottom:30px;
    }
    .a-merchant_content_slider_info{
        width:100%;
    }
    .a-merchant_content_slider_info_p{
        text-align: left;
        font-weight: 600;
    }
    .a-merchant_content_slider_info_gray{
        color:#999;
        text-align: left;
    }
    .gray{
        color:#999;
    }
    .pink{
        color:#fc6b79;
    }
    .a-merchant_content_slider_info_detail{
        position: absolute;
        bottom:5px;
        right:5px;
    }
    .a-merchant_hisRe_img{
        width:41px;
        height:41px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        float:left;
        margin-right:10px;
    }
    .a-merchant_hisRe_img img{
        height:41px;
        width:41px;
    }
    .a-merchant_hisRe_item{
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items:center;
        margin-bottom:10px;
        height:41px;
    }
    .a-merchant_content_hst_name{
        font-size: 14px;
        font-weight: bold;
        margin-right:5px;
        width: 7.5rem;
    }
    .a-merchant_hisre_item_tw{
        background-color: #f6f8fa;
        border-radius: 3px;
    }
    .a-merchant-reply{
        height:69px;
        background-color:rgba(249,249,249,1);
        display: flex;
        justify-content: space-around;
        font-size: 13px;
    }
    .a-merchant-reply_item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .a-merchant-reply_item>p:first-child{
        color:black;
        font-weight: bold;
        margin-bottom:6px;
    }
    .a-merchant-reply_item>p:last-child{
        color:#999;
    }
    .a-merchant-reply-list{
        width:100%;
        max-height:600px;
        overflow-y: scroll;
    }
    .a-merchant-reply-list_item{
        height:100px;
        padding:10px;
        border-bottom:1px solid #eee;
    }
    .a-merchant-reply-list_item>div{
        display: inline-block;
        float:left;
    }
    .a-merchant-reply-list_item>div:first-child{
        width:80px;
        height:80px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        margin-right:20px;
    }
    .a-merchant-reply-list_item .mt-progress{
        width:200px;
        color:#999;
        margin-top:10px;
    }
    .a-merchant-reply-list_item .mt-progress>div:first-child{
        padding-right: 10px;
    }
    .a-merchant-reply-list_item .mt-progress>div:last-child{
        padding-left: 10px;
    }
</style>
<style>
    #a-merchant{
        padding-bottom:55px;
    }
    #a-merchant .slider-item{
        color:black;
        font-size:12px;
        flex-direction: column;
    }
    #a-merchant .slider-container{
        padding:10px 0;
    }
</style>