import React from 'react'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Meta from './Meta'

function About() {
  return (
    <section>
      <Meta title={'Giới thiệu về Mộc tiệm An Yên'} />

        <Header activeHeading={2} />
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-5 md:py-10">

        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 className="h2 mb-4">Câu chuyện của trà An Yên</h1>
          <p className="text-xl text-gray-400">     
Mộc tiệm An Yên được thành lập từ tháng 3 năm 2022, tiệm được lập nên chỉ với mục đích duy nhất là thoả mãn đam mê bán trà, cũng như giúp cho mọi người được tiếp cận với các loại trà dễ hơn. Với mỗi loại trà bán ra, tiệm chúng tôi đã trải qua bao lần thử nghiệm, cũng như đảm bảo tất cả các khâu chế biến, sản xuất để có được một hộp trà đảm bảo chất lượng. Với chúng tôi, sản phẩm đúng chất lượng đến được tay khách hàng là một sự thành công.
             </p>
        </div>

        {/* Items */}
        <div className="grid gap-20">

          {/* 1st item */}
          <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
            {/* Image */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
              <img className="max-w-full mx-auto md:max-w-none h-auto"  width={540} height={405} alt="" src='https://live.staticflickr.com/65535/53290397837_7a86bc31b3_o.jpg' />
            </div>
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16">
                <h3 className="h3 mb-3">Mục tiêu của tiệm</h3>
                <p className="text-xl text-gray-400 mb-4">
                Một trong những “đứa con cưng” mà Mộc tiệm An Yên tự hào giới thiệu là trà Hoa đu đủ. Từ những búp sen tươi, lá trà thơm,.. được chọn lọc, sơ chế, chế biến kỹ lưỡng và biến tấu từ món trà truyền thống thành những thức uống hảo hạng, hương vị tươi ngon, mới lạ mang đậm chất riêng của Mộc tiệm An Yên
                </p>
                <p className="text-xl text-gray-400 mb-4">
                Không đơn thuần chỉ là cung cấp sản phẩm mà Mộc tiệm An Yên còn gửi gắm vào đó sự thoải mái, thư giãn, lưu giữ trong trái tim mỗi người những ký ức đẹp trong những concept hiện đại, trẻ trung và thoáng đãng
                </p>
              </div>
            </div>
          </div>

          {/* 2nd item */}
          <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
            {/* Image */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
              <img className="max-w-full mx-auto md:max-w-none h-auto"  width={540} height={405} alt="Features 02" src='https://live.staticflickr.com/65535/53291749095_336100f3df_o.jpg' />
            </div>
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
              <div className="md:pl-4 lg:pl-12 xl:pl-16">
                <h3 className="h3 mb-3">Sản phẩn tâm huyết</h3>
                <p className="text-xl text-gray-400 mb-4"> Bằng một trái tim tâm huyết, Mộc tiệm An Yên thấu hiểu được rằng, sau những bộn bề cuộc sống, những không gian kín bưng, người ta chỉ muốn đi ra ngoài để được hít thở, thư giãn.</p>
                <p className="text-xl text-gray-400 mb-4">Vì muốn giữ gìn từng chút dinh dưỡng quý giá của mẹ thiên nhiên, nên An Yên luôn ưu tiên lựa chọn áp dụng công nghệ sấy lạnh vào các sản phẩm của mình. Với chúng tôi, sản phẩm đúng chất lượng đến được tay khách hàng chính là một sự thành công!

</p>
                <p className="text-xl text-gray-400 mb-4"> Vì lẽ đó, trà của chúng tôi luôn được đảm bảo về 3 tiêu chí, sạch – đẹp – an nhiên.

</p>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
        <Footer />

  </section>
  )
}

export default About