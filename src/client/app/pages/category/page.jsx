"use cleint"
import React from 'react'
import "./page.scss"

import Table from './Table'

export default function Page() {
	return (
		<main className='category-page'>
			
			<section className='header-section'>
				<h1>Categories</h1>
			</section>

			<section className="category-body-section">

				<span className="left">
					
					<div className="table-container">
						<Table/>
					</div>

				</span>

				<span className="right">
					<div>
						<p className="bg-red-500 flex w-full h-full justify-center align-middle">
							Graph of the top 5 most spent categories
						</p>
					</div>
				</span>

			</section>

			<section className="balance-per-category">
				<p>This will be a table showing the balance per category</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est modi dolores earum in aperiam ex obcaecati amet ratione suscipit labore, aliquam laboriosam, porro excepturi ea perspiciatis architecto, officiis quae. Numquam ipsam aspernatur praesentium sequi saepe atque, itaque vel voluptates possimus eius at odit repudiandae inventore, impedit debitis dolorum esse explicabo nulla doloribus quod facilis sint voluptatum nesciunt necessitatibus? Asperiores vero fugit adipisci? Quibusdam atque omnis sed earum, doloremque commodi? Alias velit numquam est nihil, sed repellat adipisci voluptatibus voluptas nesciunt magni vel, aperiam dolores unde earum quas corrupti, excepturi aut dicta? Non odit maxime laboriosam error? Fuga nam consectetur velit, exercitationem alias animi delectus beatae vel distinctio earum reiciendis illum! Itaque neque odit numquam dolorem distinctio nulla voluptatem quasi similique. Repellendus perferendis, dolorem necessitatibus quisquam sunt odio? Inventore consequuntur animi aperiam consectetur praesentium unde earum incidunt optio, nisi laborum ad minima. Nihil laudantium porro eaque facilis libero quas vitae error, asperiores at odit architecto inventore harum vel ullam sit cum dolores pariatur consequuntur molestiae, iusto voluptatum dolore quae? Quis sunt corrupti, laboriosam qui, maiores earum praesentium animi provident temporibus minus nobis? Provident possimus dolores fugit iusto vel earum recusandae quas beatae architecto, et cum assumenda quibusdam adipisci sit aperiam, magni aspernatur accusantium deserunt ducimus obcaecati! Dolore, veniam ipsam nemo voluptatibus animi numquam quia beatae, ea fugit veritatis natus a? Ad dignissimos in animi laborum voluptatem nulla, vitae porro aspernatur non totam vero quae saepe ducimus impedit hic unde reprehenderit cumque quia sed facere illum quaerat voluptas! Quo mollitia cumque rem aperiam magni consequatur nulla reiciendis eaque vitae at, harum exercitationem fugit odit doloribus saepe odio sequi magnam delectus blanditiis ullam? Maiores perferendis laboriosam odio, ullam temporibus natus molestiae ducimus rem quibusdam nostrum? Optio doloribus iste commodi quis corrupti in nostrum molestiae, fugit vel ab illo facere assumenda atque exercitationem laudantium perferendis, quisquam quo. Accusantium iste ut quasi, laudantium, voluptas cumque deleniti ullam maiores ab et dolores doloremque dicta tenetur ducimus necessitatibus repudiandae in unde nulla ea autem mollitia soluta molestias. Tenetur placeat laborum deleniti distinctio pariatur nostrum repellat optio, quasi voluptates, quos doloribus ab sapiente aspernatur eius animi aliquam ipsum debitis illum libero a id dolor cupiditate quisquam. Velit praesentium laboriosam ullam ex eveniet natus rerum, aliquam magni sint assumenda et est fuga rem molestiae repellendus aspernatur officia reiciendis suscipit ea? Velit minima laudantium saepe, quisquam soluta necessitatibus iure molestias error assumenda laborum dolore dignissimos dolor architecto provident labore laboriosam culpa eum. Minus error recusandae nobis quibusdam distinctio exercitationem sed autem eligendi adipisci, aliquid reiciendis culpa nam ipsa commodi ipsam voluptas corporis neque. Dignissimos tempora modi cum maxime adipisci nostrum quidem excepturi pariatur unde animi qui voluptatum saepe consequuntur ducimus, fugit ex dolor at commodi veritatis optio? Iure maiores nam assumenda fugiat culpa, ea id!</p>
			</section>
		</main>
	)
}
